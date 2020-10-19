import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import getCountries, { CountryResponseInterface } from './database/country'

import authenticatedHelper from './helpers/authenticatedHelper'

interface ResponseInterface {
    statusCode: number
    headers?: object
    body: string
}

interface CacheInterface {
    lastFetch: number
    favoritedCountries: CountryResponseInterface[]
}

interface ResponseInterface {
    statusCode: number
    body: string
}

const cache: CacheInterface = {
    lastFetch: 0,
    favoritedCountries: []
}

const getFavoritedCountries = async (userId: string) => {
    const timeSinceLastFetch = Date.now() - cache.lastFetch

    // 1 day ago check
    if (timeSinceLastFetch <= 86400000) {
        return cache.favoritedCountries
    }

    try {
        const favoritedCountries = await getCountries(userId)
        cache.lastFetch = Date.now()
        cache.favoritedCountries = favoritedCountries

        return favoritedCountries
    } catch (error) {
        return error
    }
}

const handler: Handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    let response: ResponseInterface

    const authenticatedResponse = authenticatedHelper(
        event.headers.authorization
    )

    if (authenticatedResponse.statusCode === 200) {
        try {
            const countries = await getFavoritedCountries(
                authenticatedResponse.body
            )

            response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(countries)
            }
        } catch (error) {
            response = { statusCode: 400, body: JSON.stringify(error.message) }
        }
    } else {
        response = authenticatedResponse
    }

    return callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
