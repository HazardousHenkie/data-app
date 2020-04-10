import { ActionType } from 'typesafe-actions'
import setSelectedCountry from './actions'

interface CountryState {
    readonly country: object
}

type CountryActions = ActionType<typeof setSelectedCountry>

export type ContainerCountryState = CountryState
export type ContainerCountryActions = CountryActions
