import axios from "axios"

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if(token) {
        config.headers.Authorization = "Bearer " + token
    }

    return config
})