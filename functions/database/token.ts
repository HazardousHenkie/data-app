import { ExprArg } from 'faunadb'
import faunaClient, { fQuery } from './faunaDB'

interface TokenResponseInterface {
    ref: ExprArg
    ts: number
    data: {
        googleId: string
        token: string
        updatedAt: number
        createdAt: number
    }
}

const getToken = (token: string, id: string) => {
    const tokenData: Promise<TokenResponseInterface> = faunaClient.query(
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
    const tokenData: Promise<TokenResponseInterface> = faunaClient.query(
        fQuery.Delete(ref)
    )

    return tokenData
}

export const createToken = async (id: string, token: string) => {
    const tokenData: Promise<TokenResponseInterface> = faunaClient.query(
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
    const tokenData: Promise<TokenResponseInterface> = faunaClient.query(
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
