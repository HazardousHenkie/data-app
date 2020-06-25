import { Handler } from 'aws-lambda'

import fetch from 'isomorphic-fetch'

const url = `https://restcountries.eu/rest/v2/all`

interface CacheInterface {
    lastFetch: number
    countries: { [key: string]: number | object | string }[]
}

interface ResponseInterface {
    statusCode: number
    body: string
}

const cache: CacheInterface = {
    lastFetch: 0,
    countries: []
}

const slimUpCountries = (countries: []) => {
    return countries.map(
        (country: { [key: string]: number | object | string }) => ({
            name: country.name,
            alpha2Code: country.alpha2Code,
            latlng: country.latlng,
            translations: country.translations,
            nativeName: country.nativeName,
            region: country.region,
            subregion: country.subregion,
            population: country.population,
            Languages: country.Languages,
            currencies: country.currencies,
            flag: country.flag
        })
    )
}

const getCountries = async () => {
    const timeSinceLastFetch = Date.now() - cache.lastFetch

    // 1 day ago check
    if (timeSinceLastFetch <= 86400000) {
        return cache.countries
    }

    try {
        const response = await fetch(url)
        const responseJson = await response.json()
        const countries = slimUpCountries(responseJson)

        cache.lastFetch = Date.now()
        cache.countries = countries

        return countries
    } catch (error) {
        return error
    }
}

const handler: Handler = async () => {
    // if no countries check
    const countries = await getCountries()

    const response: ResponseInterface = {
        statusCode: 200,
        body: JSON.stringify(countries)
    }

    return response
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
