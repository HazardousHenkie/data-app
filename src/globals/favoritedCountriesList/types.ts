import { ResponseError } from 'utils/request'

export interface FavoritedCountryInterface {
    // fauny doesn't play along so set to any
    ref: any
    ts: number
    data: {
        userId: string
        countryId: string
        updatedAt: number
        createdAt: number
    }
}

interface FavoritedCountriesState {
    readonly error: boolean | ResponseError
    readonly loading: boolean
    readonly countries: FavoritedCountryInterface[]
}

export default FavoritedCountriesState
