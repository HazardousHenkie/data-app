import { ExprArg } from 'faunadb'
import faunaClient, { fQuery } from './faunaDB'

interface CountryResponseInterface {
    ref: ExprArg
    ts: number
    data: {
        userId: number
        countryId: number
        updatedAt: number
        createdAt: number
    }
}

// check the response of this one
const getCountries = (id: string) => {
    const countries: Promise<CountryResponseInterface> = faunaClient.query(
        fQuery.Get(fQuery.Match(fQuery.Index('get_countries_by_userId'), id))
    )

    return countries
}

export const removeCountry = (ref: ExprArg) => {
    const removedCountry: Promise<CountryResponseInterface> = faunaClient.query(
        fQuery.Delete(ref)
    )

    return removedCountry
}

export const addCountry = (id: string, countryId: string) => {
    const country: Promise<CountryResponseInterface> = faunaClient.query(
        fQuery.Create(fQuery.Collection('country_user'), {
            data: {
                userId: id,
                countryId,
                updatedAt: Date.now(),
                createdAt: Date.now()
            }
        })
    )

    return country
}

export default getCountries
