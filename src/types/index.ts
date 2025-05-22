export type User = {
    _id: string
    name: string
    email: string
    handle: string
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    confirmPassword: string
}

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>

export type RegisterFields = 'name' | 'email' | 'handle' | 'password'

export type AuthStore = {
    user: {
        isLoading: boolean
        error: string|null
        data: User|null
    }
    setUser: (user: User) => void
}