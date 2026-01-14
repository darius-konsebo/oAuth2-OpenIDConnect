import axios from "axios";

export const createApi = (token) => {
    const api = axios.create({
        baseURL: "http://localhost:8082", // ton backend Spring Boot
    });

    api.interceptors.request.use(config => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return api;
};
