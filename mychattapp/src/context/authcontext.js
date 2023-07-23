import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return user || null;
        } catch (error) {
            return null;
        }
    });

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:4000/api/auth/login", inputs, {
            //working cookies use credentials

            withCredentials: true
        });
        setCurrentUser(res.data)

    }

    useEffect(() => {
        //you can not store object inside localstorage only string can be store
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])


    return (
        <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>
    )

}

