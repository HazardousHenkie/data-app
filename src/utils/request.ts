export class ResponseError extends Error {
    public response: Response

    public responseText: string

    constructor(response: Response, responseText: string) {
        super(response.statusText)
        this.response = response
        this.responseText = responseText
    }
}

async function checkStatus(response: Response) {
    if (response.status === 204 || response.status === 205) {
        return null
    }

    if (response.status >= 200 && response.status < 300) {
        return response.json().catch(() => {
            throw new Error("Can't parse JSON.")
        })
    }

    const responseText = await response.json()

    const error = new ResponseError(response, responseText)
    error.response = response
    throw error
}

export default async function request(url: string, options?: RequestInit) {
    const fetchResponse = await fetch(url, options)
    const response = checkStatus(fetchResponse)

    return response
}
