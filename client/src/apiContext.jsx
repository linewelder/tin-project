import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Error from "./Error.js";

export const ApiContext = createContext();

export function ApiContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    const request = async (method, path, data) => {
        try {
            const headers = currentUser?.token
                ? { authorization: `Bearer ${currentUser.token}` }
                : {};

            const result = await axios({
                url: `http://localhost:8800/api${path}`,
                method,
                data,
                headers,
            });

            return [result.data, null];
        } catch (error) {
            if (!error.response) {
                return [null, new Error(false, error.message)];
            }

            return [null, new Error(true, `error.${error.response.data.error}`)];
        }
    };

    const get = async (path) => {
        return await request("get", path, undefined);
    };

    const post = async (path, body) => {
        return await request("post", path, body);
    };

    const register = async (credentials) => {
        const [result, error] = await post("/auth/register", credentials);
        if (error) return [null, error];

        setCurrentUser(result);
        return [result, null];
    };

    const login = async (credentials) => {
        const [result, error] = await post("/auth/login", credentials);
        if (error) return [null, error];

        setCurrentUser(result);
        return [result, null];
    };

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <ApiContext.Provider value={{ currentUser, get, post, register, login, logout }}>
            {children}
        </ApiContext.Provider>
    );
}
