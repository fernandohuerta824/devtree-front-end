import type { User } from "../types";
import { api } from "../utils/axios";
import { isAxiosError } from "axios";

export async function getUser() {
    try {
        const { data } = await api<{user: User}>("/user")
        return data.user;
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response?.data;  
        }
        throw new Error("Something went wrong");
    }
}

export async function updateUser(user: Pick<User, 'handle' | 'description'>) {
    try {
        await api.patch<Pick<User, 'handle' | 'description'>>("/user", user)
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response?.data;  
        }
        throw new Error("Something went wrong");
    }
}


