import { ExprArg } from 'faunadb'
import faunaClient, { fQuery } from './faunaDB'

export interface CountryResponseInterface {
    ref: ExprArg
    ts: number
    data: {
        userId: number
        countryId: number
        updatedAt: number
        createdAt: number
    }
}

const getCountries = (id: string) => {
    const countries: Promise<CountryResponseInterface[]> = faunaClient.query(
        fQuery.Map(
            fQuery.Paginate(
                fQuery.Match(fQuery.Index('get_countries_by_userId'), id)
            ),
            fQuery.Lambda(x => fQuery.Get(x))
        )
    )

    return countries
}

export const removeCountry = (ref: ExprArg) => {
    const removedCountry: Promise<CountryResponseInterface> = faunaClient.query(
        fQuery.Delete(ref)
    )

    return removedCountry
}

export const addCountry = (userId: string, countryId: string) => {
    const country: Promise<CountryResponseInterface> = faunaClient.query(
        fQuery.Create(fQuery.Collection('country_user'), {
            data: {
                userId,
                countryId,
                updatedAt: Date.now(),
                createdAt: Date.now()
            }
        })
    )

    return country
}

export default getCountries
