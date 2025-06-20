export type User = {
    name: string
    email: string
    handle: string
    id: string
    description: string
    image: string
    links: string
}

export type UserHandle = Pick<User, 'description' | 'name' | 'handle' | 'image'> & {
    links: SocialNetwork[]
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    confirmPassword: string
}

export type ProfileUser = Pick<User, 'description' | 'handle' | 'links'>

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>

export type RegisterFields = 'name' | 'email' | 'handle' | 'password'

export type UpdateProfileFields = 'description' | 'handle'

export type SocialNetwork = {
    id: number,
    name: string
    url: string
    enabled: boolean
}
