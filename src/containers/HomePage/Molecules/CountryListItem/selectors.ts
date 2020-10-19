import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import { CountryInterface } from './types'
import { CountryItem } from './constants'

export const initialCountryState = CountryItem

export const selectCountry = (state: ApplicationRootState) => {
    return state.country || initialCountryState
}

const makeSelectCountry = () =>
    createSelector(selectCountry, subState => subState.country) as Selector<
        unknown,
        CountryInterface
    >

export default makeSelectCountry
