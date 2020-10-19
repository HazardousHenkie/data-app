import jwt from 'jsonwebtoken'
import cookie from 'cookie'

const createJwtAuthToken = (userId: string, name: string) => {
    const secretKey = `-----BEGIN RSA PRIVATE KEY-----\n${process.env.JWT_SECRET_KEY}\n-----END RSA PRIVATE KEY-----`

    const token = jwt.sign({ userId, name }, secretKey, {
        algorithm: 'RS256',
        expiresIn: '15m'
    })

    return token
}

export const createJwtRefreshToken = (userId: string, name: string) => {
    const secretKey = `-----BEGIN RSA PRIVATE KEY-----\n${process.env.REFRESH_SECRET_KEY}\n-----END RSA PRIVATE KEY-----`

    const token = jwt.sign({ userId, name }, secretKey, {
        algorithm: 'RS256',
        expiresIn: '30d'
    })

    return token
}

export const createRefreshCookie = (token: string) => {
    const jwtCookie = cookie.serialize('jwt_refresh', token, {
        // local isn't https so check the secure tag
        secure: process.env.NETLIFY_DEV !== 'true',
        httpOnly: true,
        path: '/'
    })

    return jwtCookie
}

export const clearJwtRefreshCookie = () =>
    'jwt_refresh=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

export default createJwtAuthToken
