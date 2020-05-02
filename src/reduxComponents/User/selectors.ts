import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import { initialUserState } from './reducer'

const selectUser = (state: ApplicationRootState) =>
    state.user || initialUserState

const makeSelectUser = () =>
    createSelector(selectUser, subState => subState.user) as Selector<
        unknown,
        Record<string, any>
    >

export { selectUser, makeSelectUser }
