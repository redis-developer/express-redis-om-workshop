import { Router } from 'express'

import { personRepository } from '../om/person.js'

export const router = Router()

router.get('/all', async (req, res) => {

  /* search for all Persons */
  const persons = await personRepository.search().return.all()

  /* return all Persons */
  res.send(persons)
})

router.get('/by-last-name/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const lastName = req.params.lastName

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('lastName').equals(lastName).return.all()

  /* return the found Persons */
  res.send(persons)
})

router.get('/old-enough-to-drink-in-america', async (req, res) => {
  
  /* search for matching Persons */
  const persons = await personRepository.search()
  .where('age').gte(21).return.all()
  
  /* return the found Persons */
  res.send(persons)
})

router.get('/non-verified', async (req, res) => {

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('verified').is.not.true().return.all()

  /* return the found Persons */
  res.send(persons)
})

router.get('/verified-drinkers-with-last-name/:lastName', async (req, res) => {

  /* extract and coerce the parameters */
  const lastName = req.params.lastName

  /* fetch the Person */
  const persons = await personRepository.search()
    .where('verified').is.true()
      .and('age').gte(21)
      .and('lastName').equals(lastName).return.all()

  /* return the found Persons */
  res.send(persons)
})

router.get('/with-statement-containing/:text', async (req, res) => {

  /* extract and coerce the parameters */
  const text = req.params.text

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('personalStatement').matches(text)
      .return.all()

  /* return the found Persons */
  res.send(persons)
})

router.get('/near/:lng,:lat/radius/:radius', async (req, res) => {

  /* extract and coerce the parameters */
  const longitude = Number(req.params.lng)
  const latitude = Number(req.params.lat)
  const radius = Number(req.params.radius)

  /* search for matching Persons */
  const persons = await personRepository.search()
    .where('location')
      .inRadius(circle => circle
          .longitude(longitude)
          .latitude(latitude)
          .radius(radius)
          .miles)
        .return.all()

  /* return the found Persons */
  res.send(persons)
})
