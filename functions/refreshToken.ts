import jwt from 'jsonwebtoken'

import cookie from 'cookie'

import { Handler, APIGatewayEvent } from 'aws-lambda'

import createJwtAuthToken from './helpers/jwt-helpers'

import publicKey from './keys/publicKeyRefresh'

import getRefreshToken from './database/token'
import getUser from './database/user'

interface Response {
    statusCode: number
    headers?: object
    // no any
    body: any
}

const handler: Handler = async (event: APIGatewayEvent) => {
    let response: Response

    if (
        event.body &&
        event.headers.cookie &&
        JSON.parse(event.body) &&
        JSON.parse(event.body).userId
    ) {
        try {
            const refreshCookie = cookie.parse(event.headers.cookie).jwt_refresh
            const { userId } = JSON.parse(event.body)

            if (refreshCookie && userId) {
                const user = await getUser(userId)

                if (!user) {
                    throw new Error("User hasn't been registered.")
                }

                const refreshCookiePayload = jwt.verify(
                    refreshCookie,
                    publicKey
                ) as {
                    [key: string]: string | number
                }
                if (refreshCookiePayload.userId !== userId) {
                    throw new Error('Invalid refresh token.')
                }

                const refreshTokenDB = await getRefreshToken(
                    user.data.googleId,
                    refreshCookie
                ).catch(() => {
                    throw new Error('Invalid refresh token')
                })

                if (!refreshTokenDB) {
                    throw new Error('Invalid refresh token')
                }

                const authToken = createJwtAuthToken(
                    user.data.googleId,
                    user.data.name
                )

                response = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            userId: user.data.googleId,
                            username: user.data.name
                        },
                        authToken
                    })
                }
            } else {
                throw new Error('Cookies not valid or present.')
            }
        } catch (error) {
            response = { statusCode: 400, body: JSON.stringify(error.message) }
        }
    } else {
        response = {
            statusCode: 422,
            body: "Event body wasn't correct or refreshToken wasn't found."
        }
    }

    return response
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
