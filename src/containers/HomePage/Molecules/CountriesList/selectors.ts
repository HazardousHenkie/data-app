import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import { initialCountriesHeaderState } from './reducer'

const selectCountriesData = (state: ApplicationRootState) =>
    state.countriesData || initialCountriesHeaderState

const makeSelectError = () =>
    createSelector(selectCountriesData, subState => subState.error) as Selector<
        unknown,
        boolean | Error
    >
const makeSelectLoader = () =>
    createSelector(
        selectCountriesData,
        subState => subState.loading
    ) as Selector<unknown, boolean>
const makeSelectData = () =>
    createSelector(selectCountriesData, subState => subState.data) as Selector<
        unknown,
        object[]
    >

export {
    selectCountriesData,
    makeSelectError,
    makeSelectLoader,
    makeSelectData
}
