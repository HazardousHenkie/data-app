import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import authenticatedHelper from './helpers/authenticatedHelper'

import getId from './helpers/getId'

import { addCountry } from './database/country'

interface ResponseInterface {
    statusCode: number
    headers?: object
    body: string | number
}

const handler: Handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    const authenticatedResponse = authenticatedHelper(
        event.headers.authorization
    )
    let response: ResponseInterface

    if (authenticatedResponse.statusCode === 200) {
        try {
            await addCountry(authenticatedResponse.body, getId(event.path))

            response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'Saved successfully.' })
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
