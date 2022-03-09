import { Client } from 'redis-om'

const url = process.env.REDIS_URL
const client = await new Client().open(url)

export default client