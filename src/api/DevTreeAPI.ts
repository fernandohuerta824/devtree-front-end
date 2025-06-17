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

export async function updateUser(user: Pick<User, 'handle' | 'description' | 'links'>) {
    try {
        const { data } = await api.patch<{user: User, message: string}>("/user", user)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response?.data;  
        }
        throw new Error("Something went wrong");
    }
}

export async function uploadImage(file: File) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const { data } =  await api.post('/user/image', formData)
        return data
    } catch (error) {
        if (isAxiosError(error)) {
            throw error.response?.data;  
        }
        throw new Error("Something went wrong");
    }
}

