import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { clearJwtRefreshCookie } from './helpers/jwt-helpers'

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
    const authToken = event.headers.authorization.split('Bearer ')
    const authenticatedResponse = authenticatedHelper(authToken[1])
    let response: ResponseInterface

    if (authenticatedResponse.statusCode === 200) {
        response = {
            statusCode: 200,
            headers: {
                'Set-Cookie': clearJwtRefreshCookie(),
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
