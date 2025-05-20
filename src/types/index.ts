export type User = {
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