export type User = {
    name: string
    email: string
    handle: string
    id: string
    description: string
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    confirmPassword: string
}

export type ProfileUser = Pick<User, 'description' | 'handle'>

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>

export type RegisterFields = 'name' | 'email' | 'handle' | 'password'

export type UpdateProfileFields = 'description' | 'handle'