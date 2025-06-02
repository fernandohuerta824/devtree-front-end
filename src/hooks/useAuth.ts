import { useContext } from "react";
import { AuthContext } from "../store/AuthStore";

export function useAuth() {
    const context =  useContext(AuthContext)


    if(!context) {
        throw new Error('Cannot access to the auth store')
    }

    return context
}