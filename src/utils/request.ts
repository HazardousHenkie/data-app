export class ResponseError extends Error {
    public response: Response

    constructor(response: Response) {
        super(response.statusText)
        this.response = response
    }
}

function parseJSON(response: Response) {
    if (response.status === 204 || response.status === 205) {
        return null
    }

    return response.json()
}

function checkStatus(response: Response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new ResponseError(response)
    error.response = response
    throw error
}

export default async function request(url: string, options?: RequestInit) {
    const fetchResponse = await fetch(url, options)
    const response = checkStatus(fetchResponse)

    return parseJSON(response)
}
