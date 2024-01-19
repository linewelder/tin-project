import axios from "axios";
import Error from "./Error.js";

async function _request(func, path, body) {
    try {
        const result = await func(`http://localhost:8800/api${path}`, body);
        return [result.data, null];
    } catch (error) {
        if (!error.response) {
            return [null, new Error(false, error.message)];
        }

        return [null, new Error(true, `error.${error.response.data.error}`)];
    }
}

export default {
    get: async (path) => {
        return await _request(axios.get, path, undefined);
    },

    post: async (path, body) => {
        return await _request(axios.post, path, body);
    }
}
