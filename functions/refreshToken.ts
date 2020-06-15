import jwt from 'jsonwebtoken'

import cookie from 'cookie'

import { Handler, APIGatewayEvent } from 'aws-lambda'

import createJwtCookie from './helpers/jwt-helpers'

import publicKey from './keys/publicKeyRefresh'

import getRefreshToken from './database/token'
import getUser from './database/user'

interface Response {
    statusCode: number
    headers?: object
    body: string
}

const handler: Handler = async (event: APIGatewayEvent) => {
    let response: Response

    if (event.body && JSON.parse(event.body).authToken) {
        try {
            const refreshCookie = cookie.parse(event.headers.cookie).jwt_refresh
            const accessCookie = cookie.parse(event.headers.cookie).jwt_access

            // console.log('refresh cookie present?', refreshCookie)
            console.log('access cookie present?', accessCookie)

            if (refreshCookie && accessCookie) {
                const accessTokenPayload = jwt.decode(accessCookie) as {
                    [key: string]: string
                }

                const user = await getUser(accessTokenPayload.userId)
                console.log('user present?', user)
                if (!user) {
                    throw new Error("User hasn't been registered.")
                }

                const refreshCookiePayload = jwt.verify(
                    refreshCookie,
                    publicKey
                ) as {
                    [key: string]: string | number
                }
                if (refreshCookiePayload.userId !== accessTokenPayload.userId) {
                    throw new Error('Invalid access token')
                }

                console.log(
                    'refresh cookie payload verified?',
                    refreshCookiePayload
                )

                const refreshTokenDB = await getRefreshToken(
                    user.data.googleId,
                    refreshCookie
                )
                console.log('refresh token in db?', refreshTokenDB)
                if (!refreshTokenDB) {
                    throw new Error('Invalid access token')
                }

                // everything is fine create 200 response with new accescookie
                response = {
                    statusCode: 200,
                    headers: {
                        'Set-Cookie': [
                            createJwtCookie(user.data.googleId, user.data.name)
                        ],
                        'Content-Type': 'application/json'
                    },
                    body: 'new auth token succesfully created'
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
