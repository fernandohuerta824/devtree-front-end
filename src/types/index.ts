export type User = {
    name: string
    email: string
    handle: string
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    confirmPassword: string
}

export type RegisterFields = 'name' | 'email' | 'handle' | 'password'