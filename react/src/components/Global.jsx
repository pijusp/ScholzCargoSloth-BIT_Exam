import { createContext, useState } from "react";

import axios from "axios";

export const Global = createContext();
const baseURL = "http://localhost:3003";
export const GlobalProvider = ({ children }) => {
    const [logged, setLogged] = useState(null);
    const [authName, setAuthName] = useState(null);

    const logOut = (_) => {
        axios
            .post(`${baseURL}/logout`, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setLogged(false);
                setAuthName(false);
            });
    };

    return (
        <Global.Provider
            value={{
                // auth
                authName,
                setAuthName,
                logOut,
                logged,
                setLogged,
            }}
        >
            {children}
        </Global.Provider>
    );
};
