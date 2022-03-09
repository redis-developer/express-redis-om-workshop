import { Router } from 'express'

import { personRepository } from '../om/person.js'

export const router = Router()

// CREATE
router.put('/', async (req, res) => {
  const person = await personRepository.createAndSave(req.body)
  res.send(person)
})

// READ
router.get('/:id', async (req, res) => {})

// UPDATE
router.post('/:id', async (req, res) => {})

// DELETE
router.delete('/:id', async (req, res) => {})
