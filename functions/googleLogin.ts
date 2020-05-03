import { Handler, APIGatewayEvent } from 'aws-lambda'

import { OAuth2Client } from 'google-auth-library'

import createJwtCookie from './helpers/jwt-helpers'

interface Response {
    statusCode: number
    headers?: object
    body: string
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
            await verify(JSON.parse(event.body).authToken)
            // check fauna security
            // if token correct get user from db and send back token too.

            // implement refresh token? make token long lived? or? it's only send once so secure?
            // check if token is still valid and login again if not (check on page load and request not in this file)
            response = {
                statusCode: 200,
                // change authtoken to user id from DB
                headers: {
                    'Set-Cookie': createJwtCookie(
                        JSON.parse(event.body).authToken
                    ),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: '⊂◉‿◉つ'
                })
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
