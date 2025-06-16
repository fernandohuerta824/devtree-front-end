export type User = {
    _id: string
    name: string
    email: string
    handle: string
    description: string
    image: string
    links: string
}

export type RegisterUser = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    confirmPassword: string
}

export type ProfileUser = Pick<User, 'description' | 'handle'>

export type LoginUser = Pick<RegisterUser, 'email' | 'password'>

export type RegisterFields = 'name' | 'email' | 'handle' | 'password'

export type UpdateProfileFields = 'description' | 'handle'

export type AuthStore = {
    user: User | null
    setUser: (user: User | null) => void
    login: (token: string) => Promise<void>
    logout: () => void
}

export type SocialNetwork = {
    id: number,
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>