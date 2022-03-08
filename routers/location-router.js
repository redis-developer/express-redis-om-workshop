import { Router } from 'express'

import { personRepository } from '../om/person.js'
import { connection } from '../om/client.js'

export const router = Router()

router.patch('/:id/location/:lng,:lat', async (req, res) => {

  /* extract and coerce the parameters */
  const id = req.params.id
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)

  /* set the updated date time to right now */
  const locationUpdated = new Date()

  /* update the location using Redis OM */
  const person = await personRepository.fetch(id)
  person.location = { longitude, latitude }
  person.locationUpdated = locationUpdated
  await personRepository.save(person)

  /* log the location update to a stream using Node Redis */
  await connection.xAdd(`${person.keyName}:locationHistory`, '*', person.location)

  /* return the changed field */
  res.send({ id, locationUpdated, location: { longitude, latitude } })
})
