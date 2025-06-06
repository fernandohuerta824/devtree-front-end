import { api } from "../utils/axios";
import type { User } from "../types";
import { isAxiosError } from "axios";

export const getUser = async () => {
    try {
        const token = localStorage.getItem("AUTH_TOKEN");
        const res = await api.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return {
            user: res.data.user as User,
        }
    } catch (error) {
        if(isAxiosError(error) && error.status === 401) {
            return {
                user: null
            }
        }

        throw error
    }

}

export const authLoader = () => {
    return {
        data: getUser(),
    }
}
