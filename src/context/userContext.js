import { createContext, useState } from "react";

export const contexto = createContext("");

export const Context = (props) => {
    const [permanecerConectado, setPermanecerConectado] = useState(false);
    const [attpage, setAttpage] = useState(0);
    const [token, setToken] = useState(
        JSON.parse(localStorage?.getItem("userInfo"))
    );
    const [userData, setUserData] = useState(
        JSON.parse(localStorage?.getItem("userInfo"))?.userData
    );

    return (
        <contexto.Provider
            value={{
                token,
                setToken,
                permanecerConectado,
                setPermanecerConectado,
                attpage,
                setAttpage,
                userData,
                setUserData
            }}
        >
            {props.children}
        </contexto.Provider>
    );
};
