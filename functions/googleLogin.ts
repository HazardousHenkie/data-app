import { Handler, APIGatewayEvent } from 'aws-lambda'

import { ExprArg } from 'faunadb'

import { OAuth2Client } from 'google-auth-library'

import cookie from 'cookie'

import createJwtCookie, {
    createRefreshCookie,
    createRefreshToken
} from './helpers/jwt-helpers'

import getUser, { createUser } from './database/user'

import getRefreshToken, { createToken, removeToken } from './database/token'

interface Response {
    statusCode: number
    headers?: object
    body: string
}

interface UserResponseInterface {
    ref: ExprArg
    ts: number
    data: Record<string, string>
}

const clientID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientID)

const verify = async (authToken: string) => {
    if (clientID) {
        const ticket = await client.verifyIdToken({
            idToken: authToken,
            audience: clientID
        })
        const payload = ticket.getPayload()
        if (payload && payload.aud === clientID) {
            return payload
        }
    }

    throw new Error('validation not successfull.')
}

const handler: Handler = async (event: APIGatewayEvent) => {
    let response: Response

    if (event.body && JSON.parse(event.body).authToken) {
        try {
            const googleUser = await verify(JSON.parse(event.body).authToken)
            let existingUser: UserResponseInterface

            try {
                existingUser = await getUser(googleUser.sub)
            } catch (error) {
                if (
                    error.requestResult.statusCode === 404 &&
                    googleUser &&
                    googleUser.name &&
                    googleUser.sub
                ) {
                    existingUser = await createUser(
                        googleUser.sub,
                        googleUser.name
                    )
                } else {
                    throw new Error(error)
                }
            }

            if (existingUser?.data && googleUser.name) {
                const refreshCookie = cookie.parse(event.headers.cookie)
                    .jwt_refresh
                let dbToken

                if (refreshCookie) {
                    try {
                        dbToken = await getRefreshToken(
                            googleUser.sub,
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

                const refreshToken = createRefreshToken(
                    googleUser.sub,
                    googleUser.name
                )

                await createToken(googleUser.sub, refreshToken)

                response = {
                    statusCode: 200,
                    headers: {
                        'Set-Cookie': [
                            createJwtCookie(
                                existingUser.data.googleId,
                                existingUser.data.name
                            ),
                            createRefreshCookie(refreshToken)
                        ],
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(existingUser.data)
                }
            } else {
                response = { statusCode: 400, body: 'User DB error.' }
            }
        } catch (error) {
            response = { statusCode: 400, body: JSON.stringify(error.message) }
        }
    } else {
        response = {
            statusCode: 422,
            body: "Event body wasn't correct or authToken wasn't found."
        }
    }

    return response
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
