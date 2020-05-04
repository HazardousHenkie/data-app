import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { clearCookie } from './helpers/jwt-helpers'

import authenticatedHelper from './helpers/authenticatedHelper'

interface ResponseInterface {
    statusCode: number
    headers?: object
    body: string | number
}

const handler: Handler = (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    const authenticatedResponse = authenticatedHelper(event.headers.cookie)
    let response: ResponseInterface

    if (authenticatedResponse.statusCode === 200) {
        response = {
            statusCode: 200,
            headers: {
                'Set-Cookie': clearCookie(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Logged out successfully.' })
        }
    } else {
        response = authenticatedResponse
    }

    return callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
