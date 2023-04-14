import { useState, useContext } from "react";
import axios from "axios";
import { Global } from "../../components/Global";
import { Store } from "../../store";
import { navigate } from "../../actions";

const baseURL = "http://localhost:3003";

function Login() {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { setLogged, setAuthName } = useContext(Global);
    const { dispatch } = useContext(Store);
    const login = (_) => {
        axios
            .post(
                `${baseURL}/login`,
                { name, password },
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "ok") {
                    setName("");
                    setPassword("");
                    setError(null);
                    setLogged(true);
                    setAuthName(res.data.name);
                    dispatch(navigate("home"));
                } else {
                    setError(true);
                }
            });
    };

    return (
        <div className="card mt-4" style={{ width: "30rem", margin: "auto" }}>
            <div className="card-header">
                {error ? (
                    <span style={{ color: "crimson" }}>Login Error</span>
                ) : (
                    <span>Login</span>
                )}
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    <span>Hello, guest</span>
                </h5>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary m-1" onClick={login}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
