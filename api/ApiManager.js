import axios from "axios";

const ApiManager = axios.create ({
    baseURL: 'https://core.s4e.link/api',
    responseType: 'json',
    withCredentials: true,
});