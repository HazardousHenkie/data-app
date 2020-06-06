import { ResponseError } from 'utils/request'

export interface FavoritedCountryInterface {
    name: string
}

interface FavoritedCountriesState {
    readonly error: boolean | ResponseError
    readonly loading: boolean
    readonly countries: FavoritedCountryInterface[]
}

export default FavoritedCountriesState
