import jwt from 'jsonwebtoken'
import cookie from 'cookie'

import publicKey from '../keys/publicKeyAccess'

const authenticatedWrapper = (toBeCheckedCookie: string) => {
    const cookies = toBeCheckedCookie && cookie.parse(toBeCheckedCookie)

    if (!cookies || !cookies.jwt_access) {
        const response = {
            statusCode: 401,
            body: JSON.stringify({
                message:
                    'There is no jwt cookie, so the request is unauthorized'
            })
        }

        return response
    }

    try {
        const payload = jwt.verify(cookies.jwt_access, publicKey) as Record<
            string,
            string | number
        >

        const response = { statusCode: 200, body: payload.userId }

        return response
    } catch (err) {
        const response = {
            statusCode: 401,
            body: JSON.stringify({ message: err.message })
        }

        return response
    }
}

export default authenticatedWrapper
