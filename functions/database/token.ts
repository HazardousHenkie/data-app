import { ExprArg } from 'faunadb'
import faunaClient, { fQuery } from './faunaDB'

interface UserResponseInterface {
    ref: ExprArg
    ts: number
    data: { [key: string]: string }
}

export const getToken = (token: string, id: string) => {
    const tokenData: Promise<UserResponseInterface> = faunaClient.query(
        fQuery.Get(
            fQuery.Match(
                fQuery.Index('get_token_by_token_and_googleId'),
                token,
                id
            )
        )
    )

    return tokenData
}

export const removeToken = (ref: ExprArg) => {
    const tokenData: Promise<object> = faunaClient.query(fQuery.Delete(ref))

    return tokenData
}

export const createToken = (id: string, token: string) => {
    const tokenData: Promise<UserResponseInterface> = faunaClient.query(
        fQuery.Create(fQuery.Collection('tokens'), {
            data: {
                googleId: id,
                token,
                updatedAt: Date.now(),
                createdAt: Date.now()
            }
        })
    )

    return tokenData
}

export const updateToken = (token: string, id: string) => {
    const tokenData: Promise<UserResponseInterface> = faunaClient.query(
        fQuery.Create(fQuery.Collection('tokens'), {
            data: {
                googleId: id,
                token,
                updatedAt: Date.now()
            }
        })
    )

    return tokenData
}

export default getToken
