import { ExprArg } from 'faunadb'
import { ResponseError } from 'utils/request'

export interface FavoritedCountryInterface {
    ref: ExprArg
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
