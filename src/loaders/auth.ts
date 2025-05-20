import { api } from "../utils/axios";

async function getUser () {
    const token = localStorage.getItem('AUTH_TOKEN')
    const res = await api.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return res
}

export default function auth () {
    return {
        data: getUser()
    }
}