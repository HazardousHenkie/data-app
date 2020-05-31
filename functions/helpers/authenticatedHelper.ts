import jwt from 'jsonwebtoken'

import serialize from 'serialize-javascript'
import publicKey from '../keys/publicKeyAccess'

const authenticatedWrapper = (toBeCheckedCookie: string) => {
    if (!toBeCheckedCookie) {
        const response = {
            statusCode: 401,
            body: serialize({
                message:
                    'There is no jwt cookie, so the request is unauthorized'
            })
        }

        return response
    }

    try {
        const payload = jwt.verify(toBeCheckedCookie, publicKey) as {
            [key: string]: string | number
        }

        const response = { statusCode: 200, body: payload.userId }

        return response
    } catch (err) {
        const response = {
            statusCode: 401,
            body: serialize({ message: err.message })
        }

        return response
    }
}

export default authenticatedWrapper
