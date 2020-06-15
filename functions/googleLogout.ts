import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import cookie from 'cookie'

import {
    clearJwtAccessCookie,
    clearJwtRefreshCookie
} from './helpers/jwt-helpers'

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
    const authenticatedResponse = authenticatedHelper(
        cookie.parse(event.headers.cookie).jwt_access
    )
    let response: ResponseInterface

    if (authenticatedResponse.statusCode === 200) {
        // remove refreshtoken entry from db here
        response = {
            statusCode: 200,
            headers: {
                'Set-Cookie': [clearJwtAccessCookie(), clearJwtRefreshCookie()],
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
