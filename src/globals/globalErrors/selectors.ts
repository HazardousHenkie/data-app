import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'

import { initialErrorsState } from './constants'

const makeSelectInitialErrors = (state: ApplicationRootState) =>
    state.errors || initialErrorsState

const makeSelectErrors = () =>
    createSelector(
        makeSelectInitialErrors,
        subState => subState.errors
    ) as Selector<unknown, Error[]>

export { makeSelectInitialErrors, makeSelectErrors }
