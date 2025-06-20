import { isAxiosError } from "axios"
import type { UserHandle } from "../types"
import { api } from "../utils/axios"

const getUserByHandle = async (handle: string) => {
    try {
        const { data } = await api<{user: UserHandle}>(`/user/${handle}`)
        return data.user
    } catch(error) {
        if(isAxiosError(error)) {
            if(error.status === 404) {
                return null
            }
        }
        console.log(error)
        throw new Error()
    }
}

export const devTreeViewLoader = ({ params }) => {
    return {
        user: getUserByHandle(params.handle)
    }
}