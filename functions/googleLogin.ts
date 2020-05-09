import { Handler, APIGatewayEvent } from 'aws-lambda'

import { ExprArg } from 'faunadb'

import { OAuth2Client } from 'google-auth-library'

import createJwtCookie from './helpers/jwt-helpers'
import faunaClient, { fQuery } from './helpers/faunaDB'

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
            let existingUser: UserResponseInterface | undefined

            try {
                existingUser = await faunaClient.query(
                    fQuery.Get(
                        fQuery.Match(
                            fQuery.Index('get_user_by_googleId'),
                            googleUser.sub
                        )
                    )
                )
            } catch (error) {
                if (error.requestResult.statusCode === 404) {
                    existingUser = await faunaClient.query(
                        fQuery.Create(fQuery.Collection('users'), {
                            data: {
                                googleId: googleUser.sub,
                                name: googleUser.name
                            }
                        })
                    )
                } else {
                    throw new Error(error)
                }
            }

            // check all this again but basically have a refresh token issued with the access token. this can be a randow generated string, a jwt or something else.
            // set the jwt token time limit to 15 minutes
            // having a reqeust token makes the tokens revokable and adds an extra layer of security. you can revoke all the access tokens on a new access token reqeust and yu can check for to many request because this might be a hacker
            // you can have a extra check against to db to check which user uses wich access token and as a extra layer of security so nothing is moddified
            // theoretically but not applicable here the refresh token is only issued once by a auth server (not the resource server) but the auth token is always used so easier to undercept and use by bad guys

            // medium.com/bojagi/using-refresh-tokens-in-node-to-stay-authenticated-ad0c9d2b444f uuid maybe?
            // refresh tokens need to be stored in db hashed or identified otherwise
            // https://afteracademy.com/blog/implement-json-web-token-jwt-authentication-using-access-token-and-refresh-token
            // change acces token to local storage and not cookie?

            // check if token is still valid and login again if not (check on page load and request not in this file)

            if (existingUser?.data) {
                response = {
                    statusCode: 200,
                    headers: {
                        'Set-Cookie': createJwtCookie(
                            existingUser.data.googleId,
                            existingUser.data.name
                        ),
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
