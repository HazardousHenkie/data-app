import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import AuthenticationState from './types'
import initialAuthenticationState from './constants'

const selectAuthenticationData = (state: ApplicationRootState) =>
    state.authenticationData || initialAuthenticationState

const makeSelectError = () =>
    createSelector(
        selectAuthenticationData,
        subState => subState.error
    ) as Selector<unknown, boolean | Error>

const makeSelectLoggedIn = () =>
    createSelector(
        selectAuthenticationData,
        subState => subState.loggedIn
    ) as Selector<unknown, boolean>

const makeSelectLoader = () =>
    createSelector(
        selectAuthenticationData,
        subState => subState.loading
    ) as Selector<unknown, boolean>

const makeSelectUser = () =>
    createSelector(
        selectAuthenticationData,
        subState => subState.user
    ) as Selector<unknown, AuthenticationState['user']>

export {
    selectAuthenticationData,
    makeSelectError,
    makeSelectLoggedIn,
    makeSelectLoader,
    makeSelectUser
}
