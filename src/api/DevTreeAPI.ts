import type { User } from "../types";
import { api } from "../utils/axios";
import { isAxiosError } from "axios";

export async function getUser() {
    try {
        const { data } = await api<{user: User & {id: string}}>("/user")
        return data.user;
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response?.data;  
        }
        throw new Error("Something went wrong");
    }
}
