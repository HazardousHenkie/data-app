import AuthenticationState, { User } from './types'

export const initialUserState: User = {
    id: 0,
    name: ''
}

const initialAuthenticationState: AuthenticationState = {
    loggedIn: false,
    error: false,
    loading: false,
    user: initialUserState
}

export default initialAuthenticationState
