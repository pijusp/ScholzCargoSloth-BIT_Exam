import Link from "./Link";
import { useContext } from "react";
import { Global } from "./Global";

export default function Nav() {
    const { authName, logOut } = useContext(Global);
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light"
            style={{ backgroundColor: "#f5f5dc" }}
        >
            <div className="container-fluid">
                <div className="navbar-logo">
                    <img
                        src="/logo.png"
                        alt="Go donate me!"
                        className="logo-photo"
                    />
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="home" className="nav-link active">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="stories-create" className="nav-link">
                                Create a goal
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link action="stories-list" className="nav-link">
                                Stories list
                            </Link>
                        </li>
                    </ul>
                    <div className="auth">
                        {authName ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">
                                        <b>{authName}</b>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" onClick={logOut}>
                                        Logout
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <span className="navbar-text">
                                    <Link to="login" className="nav-link">
                                        Log In
                                    </Link>
                                </span>
                                <span className="navbar-text">
                                    <Link to="register" className="nav-link">
                                        Register
                                    </Link>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
