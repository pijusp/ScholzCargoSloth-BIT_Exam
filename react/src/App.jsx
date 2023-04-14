import "bootstrap/dist/css/bootstrap.min.css";
import "./app.scss";
import { useContext } from "react";
import { Store } from "./store";

import Nav from "./components/Nav";
import StoriesCreate from "./pages/categories/Create";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BoxesList from "./pages/categories/List";
import Messages from "./components/Messages";
import SectionsEdit from "./pages/categories/Edit";
import Loader from "./components/Loader";
import { GlobalProvider } from "./components/Global";
import Auth from "./components/Auth";

function App() {
    const { page, pageTop, messages, loader } = useContext(Store);
    return (
        <GlobalProvider>
            {loader ? <Loader /> : null}
            {pageTop === "nav" ? <Nav /> : null}
            {messages && messages.length ? (
                <Messages messages={messages} />
            ) : null}
            {page === "home" ? <Home /> : null}
            {page === "boxes-create" ? (
                <Auth>
                    <StoriesCreate />
                </Auth>
            ) : null}
            {page === "boxes-list" ? <BoxesList /> : null}
            {page === "boxes-show-edit" ? <SectionsEdit /> : null}
            {page === "login" ? <Login /> : null}
            {page === "register" ? <Register /> : null}
        </GlobalProvider>
    );
}
export default App;
