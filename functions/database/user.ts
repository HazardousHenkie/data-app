import { ExprArg } from 'faunadb'
import faunaClient, { fQuery } from './faunaDB'

interface UserResponseInterface {
    ref: ExprArg
    ts: number
    data: {
        googleId: string
        name: string
    }
}

const getUser = (id: string) => {
    const user: Promise<UserResponseInterface> = faunaClient.query(
        fQuery.Get(fQuery.Match(fQuery.Index('get_user_by_googleId'), id))
    )

    return user
}

export const createUser = (id: string, name: string) => {
    const user: Promise<UserResponseInterface> = faunaClient.query(
        fQuery.Create(fQuery.Collection('users'), {
            data: {
                googleId: id,
                name
            }
        })
    )

    return user
}

export default getUser
