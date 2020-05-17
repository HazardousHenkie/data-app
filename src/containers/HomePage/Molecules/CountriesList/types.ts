import { ActionType } from 'typesafe-actions'

import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'
import * as actions from './actions'

interface CountriesListState {
    readonly data: CountryInterface[]
    readonly error?: Error | boolean
    readonly loading: boolean
}

type CountriesListActions = ActionType<typeof actions>

export type ContainerCountriesListState = CountriesListState
export type ContainerCountriesListActions = CountriesListActions
