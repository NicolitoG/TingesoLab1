import httpClient from "../http-common";

const register = (data) => {
    return httpClient.post("/api/v1/client/register", data);
}

const login = (data) => {
    return httpClient.post("/api/v1/client/login", data);
}


export default {register, login};