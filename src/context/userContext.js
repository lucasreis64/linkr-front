import { createContext, useState } from "react";

export const contexto = createContext("");

export const Context = (props) => {
    const [permanecerConectado, setPermanecerConectado] = useState(false);
    const [token, setToken] = useState(
        JSON.parse(localStorage?.getItem("userInfo"))
    );

    return (
        <contexto.Provider
            value={{
                token,
                setToken,
                permanecerConectado,
                setPermanecerConectado,
            }}
        >
            {props.children}
        </contexto.Provider>
    );
};
