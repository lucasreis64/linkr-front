import { createContext, useState } from "react";

export const contexto = createContext("");

export const Context = (props) => {
    const [permanecerConectado, setPermanecerConectado] = useState(false);
    const [attpage, setAttpage] = useState(0);
    const [token, setToken] = useState(
        JSON.parse(localStorage?.getItem("userInfo"))
    );
    const [userData, setUserData] = useState({});
    const [displayReload, setDisplayReload] = useState(false);
    const [att, setAtt] = useState(0);
    const [count, setCount] = useState(0)

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
                setUserData,
                displayReload,
                setDisplayReload,
                att,
                setAtt,
                count,
                setCount
            }}
        >
            {props.children}
        </contexto.Provider>
    );
};
