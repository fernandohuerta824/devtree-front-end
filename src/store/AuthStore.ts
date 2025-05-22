import { createContext } from "react";
import type { AuthStore, User } from "../types";

export const AuthContext = createContext<AuthStore>({
    user: {
        isLoading: true,
        error: null,
        data: null
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setUser(user: User) {user}
})