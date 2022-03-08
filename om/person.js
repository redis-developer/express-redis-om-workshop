import { Entity, Schema } from 'redis-om'

import client from './client.js'

class Person extends Entity {}

const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  location: { type: 'point' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' }
})

export const personRepository = client.fetchRepository(personSchema)

await personRepository.createIndex()
