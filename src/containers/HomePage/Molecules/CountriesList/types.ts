import { CountryInterface } from 'containers/HomePage/Molecules/CountryListItem/types'

export default interface CountriesListState {
    readonly data: CountryInterface[]
    readonly error?: Error | boolean
    readonly loading: boolean
}
