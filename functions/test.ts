import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface Response {
    statusCode: number
    body: string
}

const handler: Handler = (
    event: APIGatewayEvent,
    context: Context,
    callback: Callback
) => {
    // "event" has information about the path, body, headers, etc. of the request
    console.log('event', event)
    // "context" has information about the lambda environment and user details
    console.log('context', context)
    // The "callback" ends the execution of the function and returns a response back to the caller
    const response: Response = {
        statusCode: 200,
        body: JSON.stringify({
            data: '⊂◉‿◉つ'
        })
    }

    callback(null, response)
}

// eslint-disable-next-line import/prefer-default-export
export { handler }
