import { createContext, useContext, useEffect, useState } from "react";
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

export function useApiFetch(path, defaultValue, onError) {
    const [result, setResult] = useState(defaultValue);
    const api = useContext(ApiContext);

    useEffect(() => {
        (async () => {
            const [result, error] = await api.get(path);
            if (error) {
                onError(error);
                return;
            }

            setResult(result);
        })();
    }, []);

    return result;
}

export function usePagination(path, pageSize, setError) {
    const api = useContext(ApiContext);
    const [data, setData] = useState({ totalCount: 0, elements: [] });

    const load = async (first, count) => {
        const [data, error] = await api.get(
            `${path}?first=${first}&count=${count}`);
        if (error) {
            setError(error);
            return;
        }

        setData(data);
        return data;
    };
    useEffect(() => { load(0, pageSize); }, []);

    return { pageSize, load, ...data };
}
