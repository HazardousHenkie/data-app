import { ActionType } from 'typesafe-actions'
import setSelectedCountry from './actions'

export interface CountryInterface {
    alpha2Code: string
    name: string
    nativeName: string
    capital: string
    region: string
    subregion: string
    flag: string
    currency: string
    population: number
    latlng: number[]
    currencies: { [key: string]: string }[]
    languages: { [key: string]: string }[]
    translations: { [key: string]: string }
}

interface CountryState {
    readonly country: object
}

type CountryActions = ActionType<typeof setSelectedCountry>

export type ContainerCountryState = CountryState
export type ContainerCountryActions = CountryActions
