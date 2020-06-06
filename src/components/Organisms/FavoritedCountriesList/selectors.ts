import { createSelector, Selector } from 'reselect'

import { ApplicationRootState } from 'types'
import { CountryInterface } from './types'
import { initialCountryState } from './reducer'

const selectCountry = (state: ApplicationRootState) => {
    return state.country || initialCountryState
}

const makeSelectCountry = () =>
    createSelector(selectCountry, subState => subState.country) as Selector<
        unknown,
        CountryInterface
    >

export default makeSelectCountry
