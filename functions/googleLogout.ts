import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import publicKey from './keys/publicKeyRefresh'

import { clearJwtRefreshCookie } from './helpers/jwt-helpers'

import authenticatedHelper from './helpers/authenticatedHelper'
import getRefreshToken, { removeToken } from './database/token'

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
        const refreshCookie = cookie.parse(event.headers.cookie).jwt_refresh
        let dbToken

        if (refreshCookie) {
            const refreshCookiePayload = jwt.verify(
                refreshCookie,
                publicKey
            ) as {
                [key: string]: string
            }

            try {
                dbToken = await getRefreshToken(
                    refreshCookiePayload.userId,
                    refreshCookie
                )
            } catch (error) {
                if (error.requestResult.statusCode !== 404) {
                    throw new Error(error)
                }
            }

            if (dbToken) {
                await removeToken(dbToken.ref)
            }
        }

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
