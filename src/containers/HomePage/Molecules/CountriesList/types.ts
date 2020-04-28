import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

interface CountriesListState {
    readonly data: []
    readonly error?: Error | boolean
    readonly loading: boolean
}

type CountriesListActions = ActionType<typeof actions>

export type ContainerCountriesListState = CountriesListState
export type ContainerCountriesListActions = CountriesListActions
