export interface User {
    readonly id: number
    readonly name: string
}

export default interface AuthenticationState {
    readonly loggedIn: boolean
    readonly error: boolean | Error
    readonly loading: boolean
    readonly user: User
}