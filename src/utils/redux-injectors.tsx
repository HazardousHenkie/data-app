import {
    useInjectReducer as useReducer,
    useInjectSaga as useSaga
} from 'redux-injectors'
import { InjectReducerParams, InjectSagaParams } from 'types'

const useInjectReducer = ({ key, reducer }: InjectReducerParams): void => {
    useReducer({ key, reducer })
}

const useInjectSaga = ({ key, saga, mode }: InjectSagaParams): void => {
    useSaga({ key, saga, mode })
}

export { useInjectReducer }
export { useInjectSaga }
