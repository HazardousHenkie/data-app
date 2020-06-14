import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'

import { ResponseError } from 'utils/request'
import AuthenticationState from './types'
import initialAuthenticationState from './constants'

const selectAuthenticationData = (state: ApplicationRootState) =>
    state.authenticationData || initialAuthenticationState

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
    makeSelectLoggedIn,
    makeSelectLoader,
    makeSelectUser
}
