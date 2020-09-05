import { action } from 'typesafe-actions'

import createReducer from '../reducers'

describe('reducer', () => {
    it('should inject reducers', () => {
        const dummyReducer = () => 'dummyResult'

        const reducer = createReducer({ test: dummyReducer } as any)
        const state = reducer({}, action(''))

        expect(state.test).toBe('dummyResult')
    })
})
