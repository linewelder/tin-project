import axios from "axios";
import Error from "./Error.js";

class ApiWrapper {
    async login(credentials) {
        const [result, error] = await this.post("/auth/login", credentials);
        if (error) return [null, error];

        this.token = result.token;
        return [{}, null];
    }

    async get(path) {
        return await this._request("get", path, undefined);
    }

    async post(path, body) {
        return await this._request("post", path, body);
    }

    async _request(method, path, data) {
        try {
            const headers = this.token
                ? { authorization: `Bearer ${this.token}` }
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
    }
}

export default new ApiWrapper();
