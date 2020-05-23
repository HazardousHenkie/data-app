import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import LoginState from './types'
import { initialLoginState } from './constants'

const selectLoginData = (state: ApplicationRootState) =>
    state.loginData || initialLoginState

const makeSelectError = () =>
    createSelector(selectLoginData, subState => subState.error) as Selector<
        unknown,
        boolean | Error
    >

const makeSelectLoggedIn = () =>
    createSelector(selectLoginData, subState => subState.loggedIn) as Selector<
        unknown,
        boolean
    >

const makeSelectLoader = () =>
    createSelector(selectLoginData, subState => subState.loading) as Selector<
        unknown,
        boolean
    >

const makeSelectUser = () =>
    createSelector(selectLoginData, subState => subState.user) as Selector<
        unknown,
        LoginState['user']
    >

export {
    selectLoginData,
    makeSelectError,
    makeSelectLoggedIn,
    makeSelectLoader,
    makeSelectUser
}
