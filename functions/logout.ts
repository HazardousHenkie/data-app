import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

import { clearCookie } from './helpers/jwt-helpers'

interface ResponseInterface {
    statusCode: number
    headers: object
    body: string
}

const handler: Handler = (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    const response: ResponseInterface = {
        statusCode: 200,
        headers: {
            'Set-Cookie': clearCookie(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Logged out successfully.' })
    }

    // 422 error

    return callback(null, response)
}

// authorize only create wrapper function?

// eslint-disable-next-line import/prefer-default-export
export { handler }
