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
