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

export default interface CountryState {
    readonly country: CountryInterface
}
