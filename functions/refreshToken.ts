import jwt from 'jsonwebtoken'

import cookie from 'cookie'

import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { ExprArg } from 'faunadb'
import publicKey from './keys/publicKeyRefresh'

interface Response {
    statusCode: number
    headers?: object
    body: string
}

interface UserResponseInterface {
    ref: ExprArg
    ts: number
    data: { [key: string]: string }
}

const handler: Handler = (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    let response: Response

    if (event.body && JSON.parse(event.body).authToken) {
        // get id from somewhere maybe the acces token jwt
        // check for the user

        try {
            const payload = jwt.verify(
                cookie.parse(event.headers.cookie).jwt_refresh,
                publicKey
            ) as { [key: string]: string | number }

            response = {
                statusCode: 200,
                headers: {
                    'Set-Cookie': [
                        // createJwtCookie(
                        //     existingUser.data.googleId,
                        //     existingUser.data.name
                        // )
                    ],
                    'Content-Type': 'application/json'
                },
                body: 'new auth token succesfully created'
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

    return callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }

// get id from somewhere maybe the acces token jwt
// check for the user

// check if id and token are in db
// if everything is fine create new token
// console.log('before', refreshToken)

// const existingRefreshToken = await getToken(refreshToken, googleUser.sub)

// https://github.com/afteracademy/nodejs-backend-architecture-typescript/blob/master/src/routes/v1/access/token.ts
