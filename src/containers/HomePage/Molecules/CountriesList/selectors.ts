import { createSelector, Selector } from 'reselect'

import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'
import { ApplicationRootState } from 'types'
import { ResponseError } from 'utils/request'
import { initialCountriesHeaderState } from './constants'

const selectCountriesData = (state: ApplicationRootState) =>
    state.countriesData || initialCountriesHeaderState

const makeSelectError = () =>
    createSelector(selectCountriesData, subState => subState.error) as Selector<
        unknown,
        boolean | ResponseError
    >

const makeSelectLoader = () =>
    createSelector(
        selectCountriesData,
        subState => subState.loading
    ) as Selector<unknown, boolean>

const makeSelectData = () =>
    createSelector(selectCountriesData, subState => subState.data) as Selector<
        unknown,
        CountryInterface[]
    >

export {
    selectCountriesData,
    makeSelectError,
    makeSelectLoader,
    makeSelectData
}
