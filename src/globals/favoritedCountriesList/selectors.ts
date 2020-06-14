import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'

import FavoritedCountriesState from './types'
import { initialFavoritedCountriesState } from './constants'

const selectFavoritedCountriesData = (state: ApplicationRootState) =>
    state.favoritedCountries || initialFavoritedCountriesState

const makeSelectLoader = () =>
    createSelector(
        selectFavoritedCountriesData,
        subState => subState.loading
    ) as Selector<unknown, boolean>

const makeSelectFavoritedCountries = () =>
    createSelector(
        selectFavoritedCountriesData,
        subState => subState.countries
    ) as Selector<unknown, FavoritedCountriesState['countries']>

export {
    selectFavoritedCountriesData,
    makeSelectLoader,
    makeSelectFavoritedCountries
}
