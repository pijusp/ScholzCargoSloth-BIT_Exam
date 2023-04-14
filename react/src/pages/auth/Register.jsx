import { useContext, useState } from "react";

import { Store, actionsList } from "../../store";
import { navigate } from "../../actions";
function Register() {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [psw, setPsw] = useState("");
    const [psw2, setPsw2] = useState("");

    const { dispatch } = useContext(Store);
    const register = (_) => {
        if (name.length < 3) {
            setError("Bad name");
            return;
        }
        if (psw.length < 3) {
            setError("Bad password");
            return;
        }
        if (psw !== psw2) {
            setError("Passwords did not match!");
            return;
        }
        dispatch(
            actionsList["add-new-user"]({
                name,
                password: psw,
            })
        );
        setName("");
        setPsw("");
        setPsw2("");
        setError(null);
        dispatch(navigate("login"));
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <div className="card mt-4">
                        <div className="card-header">
                            {error ? (
                                <span style={{ color: "crimson" }}>
                                    {error}
                                </span>
                            ) : (
                                <span>Register</span>
                            )}
                        </div>
                        <div className="card-body">
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
                                    value={psw}
                                    onChange={(e) => setPsw(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Password Repeat
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={psw2}
                                    onChange={(e) => setPsw2(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary m-1"
                                onClick={register}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
