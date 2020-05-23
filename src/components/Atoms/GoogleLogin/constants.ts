import LoginState from './types'

enum ActionTypes {
    LOGIN_REQUEST = 'components/GoogleLogin/LOGIN_REQUEST',
    LOGIN_SUCCESS = 'components/GoogleLogin/LOGIN_SUCCESS',
    LOGIN_ERROR = 'components/GoogleLogin/LOGIN_ERROR'
}

export const initialUserState: LoginState['user'] = {
    id: 0,
    name: ''
}

export const initialLoginState: LoginState = {
    loggedIn: false,
    error: false,
    loading: false,
    user: initialUserState
}

export default ActionTypes
