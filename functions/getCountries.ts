import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import getCountries from './database/country'

import authenticatedHelper from './helpers/authenticatedHelper'

interface ResponseInterface {
    statusCode: number
    headers?: object
    body: string
}

const handler: Handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    const authToken = event.headers.authorization.split('Bearer ')
    const authenticatedResponse = authenticatedHelper(authToken[1])
    let response: ResponseInterface

    if (authenticatedResponse.statusCode === 200) {
        const countries = await getCountries(authenticatedResponse.body)

        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ countries })
        }
    } else {
        response = authenticatedResponse
    }

    return callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
