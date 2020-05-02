import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { OAuth2Client } from 'google-auth-library'

interface Response {
    statusCode: number
    body: string
}

// console variable?
const clientID =
    '761598046154-iqqu0njmks644sbtcjjrs7fvbvkoa9ge.apps.googleusercontent.com'

const client = new OAuth2Client(clientID)

const verify = async (id: string) => {
    if (clientID) {
        const ticket = await client.verifyIdToken({
            idToken: id,
            audience: clientID
        })
        const payload = ticket.getPayload()
        if (payload && payload.aud === clientID) {
            return payload
        }
    }

    throw new Error('validation not successfull.')
}

const handler: Handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    let response: Response
    if (event.body && JSON.parse(event.body).authToken) {
        try {
            await verify(JSON.parse(event.body).authToken)
            // is the id_token long lived and can you put it in the localstorage?
            // implement refresh token?
            // if token correct get user from db and send back token too.
            // create jwt token

            // check if token is still valid and login again if not (check on page load and request not in this file)
            response = {
                statusCode: 200,
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

    // check fauna security

    callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
