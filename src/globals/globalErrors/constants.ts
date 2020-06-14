import ErrorsState from './types'

enum ActionTypes {
    GET_ERRORS = 'components/globalErrors/GET_ERRORS',
    SET_ERROR = 'components/globalErrors/SET_ERROR',
    REMOVE_ERROR = 'components/globalErrors/REMOVE_ERROR',
    SET_ERRORS = 'components/globalErrors/SET_ERRORS'
}

export const initialErrorsState: ErrorsState = {
    errors: []
}

export default ActionTypes
