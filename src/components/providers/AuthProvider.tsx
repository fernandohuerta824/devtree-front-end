import { useCallback, useEffect, useState } from "react";
import { api } from "../../utils/axios";
import type { AuthStore, User } from "../../types";

import { AuthContext } from "../../store/AuthStore";
import { isAxiosError } from "axios";

export default function AuthProvider({children}: {children: React.ReactNode}) {
    const [state, setState] = useState<Pick<AuthStore, 'user'>>({
        user: {
            isLoading: true,
            error: null,
            data: null
        }
    })

    const setUser = (user: User) => {
        setState(state => {
            const newUser = {...state.user, data: user, isLoading: false, error: null}

            return {...state, user: newUser}
        })
    }

    const getUser = useCallback(async function getUser () {
        setState(state => {
            const newUser = {...state.user, isLoading: true, error: null}
            
            return {...state, user: newUser}
        })
        try {
            const token = localStorage.getItem('AUTH_TOKEN')
            const res = await api.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await new Promise((resolve) => setTimeout(resolve, 2000))
        
            setUser(res.data.user)
        } catch(error) {
            if(isAxiosError(error)) {
                setState(state => {
                const newUser = {...state.user, isLoading: false, error: error.message}
                
                return {...state, user: newUser}
                })
            }
        } 
    }, [])


    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <AuthContext.Provider value={{...state, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}