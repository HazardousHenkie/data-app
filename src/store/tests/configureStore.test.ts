import configureStore from '../configureStore'

describe('configureStore', () => {
    it('should return a store with injected enhancers', () => {
        const store = configureStore({})

        expect(store).toEqual(
            expect.objectContaining({
                runSaga: expect.any(Function),
                injectedReducers: expect.any(Object),
                injectedSagas: expect.any(Object)
            })
        )
    })

    it('should return store with global reducers', () => {
        const store = configureStore({})
        expect(store.getState()).toEqual(
            expect.objectContaining({
                errors: expect.any(Object),
                authenticationData: expect.any(Object),
                favoritedCountries: expect.any(Object)
            })
        )
    })
})
