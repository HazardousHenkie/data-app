import faunadb from 'faunadb'

const { query } = faunadb
export const fQuery = query

const faunaClient = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET as string
})

export default faunaClient
