import { createContext } from "react";
import type { AuthStore, User } from "../types";

export const AuthContext = createContext<AuthStore>({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setUser(user: User | null) {user},
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    login(token: string) {token},
    logout() {
        
    },
})