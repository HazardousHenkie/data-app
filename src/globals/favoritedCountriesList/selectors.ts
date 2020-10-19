import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'

import FavoritedCountriesState from './types'
import { initialFavoritedCountriesState } from './constants'

const selectFavoritedCountriesData = (state: ApplicationRootState) =>
    state.favoritedCountries || initialFavoritedCountriesState

const makeSelectFavoritedCountries = () =>
    createSelector(
        selectFavoritedCountriesData,
        subState => subState.countries
    ) as Selector<unknown, FavoritedCountriesState['countries']>

const makeSelectLoader = () =>
    createSelector(
        selectFavoritedCountriesData,
        subState => subState.loading
    ) as Selector<unknown, boolean>

export {
    selectFavoritedCountriesData,
    makeSelectFavoritedCountries,
    makeSelectLoader
}
