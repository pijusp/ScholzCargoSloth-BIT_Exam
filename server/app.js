const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");

const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "baigiamasisdarbas",
});

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.post("/cookie", (req, res) => {
    if (req.body.delete) {
        res.cookie("cookieMonster", "", { maxAge: -3600 });
    } else {
        res.cookie("cookieMonster", req.body.text, { maxAge: 3600 });
    }

    res.json({ msg: "OK" });
});

const convertPhoto = (photo) => {
    let type = "unknown";
    let file = null;

    if (photo === null) {
        return [type, file];
    }

    if (photo.indexOf("data:image/png;base64,") === 0) {
        type = "png";
        file = Buffer.from(
            photo.replace("data:image/png;base64,", ""),
            "base64"
        );
    } else if (photo.indexOf("data:image/jpeg;base64,") === 0) {
        type = "jpg";
        file = Buffer.from(
            photo.replace("data:image/jpeg;base64,", ""),
            "base64"
        );
    } else {
        file = Buffer.from(photo, "base64");
    }

    return [type, file];
};

const createPhoto = (photo) => {
    const [type, file] = convertPhoto(photo);

    if (file === null) {
        return null;
    }

    const fileName = uuidv4() + "." + type;
    fs.writeFileSync("./public/img/" + fileName, file);

    return fileName;
};

//*************** STORIES ********************/

app.get("/admin/boxes", (req, res) => {
    const sql = `
        SELECT id, title, img, weight, flammable, short_term
        FROM boxes
        ORDER BY title
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ data: result });
    });
});

app.get("/admin/boxes/:id", (req, res) => {
    const sql = `
        SELECT id, title, img, weight, flammable, short_term
        FROM boxes
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ data: result[0] });
    });
});
app.post("/admin/boxes", (req, res) => {
    const sql = `
    INSERT INTO boxes (title, img, weight, flammable, short_term)
    VALUES (?, ?, ?, ?, ?)
  `;
    con.query(
        sql,
        [
            req.body.title,
            createPhoto(req.body.file),
            req.body.weight,
            req.body.flammable,
            req.body.short_term,
        ],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    msg: { text: "Error adding new shipment", type: "error" },
                });
            } else {
                res.json({
                    msg: { text: "New shipment added", type: "success" },
                });
            }
        }
    );
});

app.delete("/admin/boxes/:id", (req, res) => {
    const sql = `
        DELETE FROM boxes
        WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err) => {
        if (err) throw err;
        res.json({
            msg: { text: "Box has been deleted", type: "info" },
        });
    });
});
app.put("/admin/boxes/:id", (req, res) => {
    const action = req.body.action;
    const id = req.params.id;
    let sql, params;

    if (action === "updateAmount") {
        sql = `
            UPDATE stories
            SET current_sum = current_sum + ?
            WHERE id = ?
        `;
        params = [req.body.amount, id];
    } else if (action === "updateBox") {
        sql = `
            UPDATE boxes
            SET title = ?, weight = ?, flammable = ?, short_term = ?  
            WHERE id = ?
        `;
        params = [
            req.body.title,
            req.body.description,
            req.body.current_sum,
            req.body.goal_sum,
            id,
        ];
    } else {
        // Handle invalid action
    }

    con.query(sql, params, (err) => {
        if (err) throw err;
        res.json({
            msg: { text: "Shipment has been updated!", type: "info" },
        });
    });
});

//*************** LOGIN ********************/

app.post("/login", (req, res) => {
    const sessionId = uuidv4();

    const sql = `
        UPDATE users
        SET session = ?
        WHERE name = ? AND password = ?
    `;

    con.query(
        sql,
        [sessionId, req.body.name, md5(req.body.password)],
        (err, result) => {
            if (err) throw err;
            if (result.affectedRows) {
                res.cookie("storiesSession", sessionId);
                res.json({
                    status: "ok",
                    name: req.body.name,
                });
            } else {
                res.json({
                    status: "error",
                });
            }
        }
    );
});
app.get("/login", (req, res) => {
    const sql = `
        SELECT name
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.cookies.storiesSession || ""], (err, result) => {
        if (err) throw err;

        if (result.length) {
            res.json({
                status: "ok",
                name: result[0].name,
            });
        } else {
            res.json({
                status: "error",
            });
        }
    });
});
app.post("/logout", (req, res) => {
    res.cookie("storiesSession", "");
    res.json({
        status: "logout",
    });
});

app.post("/admin/users", (req, res) => {
    const sql = `
    INSERT INTO users (name, password)
    VALUES (?, ?)
  `;
    con.query(sql, [req.body.name, md5(req.body.password)], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                msg: { text: "Error adding new user", type: "error" },
            });
        } else {
            res.json({
                msg: { text: "New user added", type: "success" },
            });
        }
    });
});
app.listen(port, () => {
    console.log(`Server is on port number: ${port}`);
});
