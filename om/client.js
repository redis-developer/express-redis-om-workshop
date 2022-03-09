import { Client } from 'redis-om'
import { createClient } from 'redis'

const url = process.env.REDIS_URL

export const connection = createClient({ url })
await connection.connect()

const client = await new Client().use(connection)

export default client
