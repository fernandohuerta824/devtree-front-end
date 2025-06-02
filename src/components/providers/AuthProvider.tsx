import { useState } from "react";
import type { AuthStore, User } from "../../types";

import { AuthContext } from "../../store/AuthStore";
import { getUser } from "../../loaders/auth";

export default function AuthProvider({children, user}: {children: React.ReactNode, user: User | null}) {
    const [state, setState] = useState<Pick<AuthStore, 'user'>>({user})

    const setUser = (user: User | null) => {
        setState(state => {
            return { ...state, user }
        })
    }

    const login = async (token: string) => {
        localStorage.setItem('auth_token', token)
        const { user } = await getUser()
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('auth_token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ ...state, setUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}