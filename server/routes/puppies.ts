import express from 'express'
import type { PuppyData } from '../models/Puppy.ts'

const router = express.Router()
export default router

import {
  createPuppy,
  deletePuppy,
  getAllPuppies,
  getPuppyById,
} from '../../store'
import { useDeletePuppy } from '../../client/hooks/api.ts'

// /api/v1/puppies gives us all the puppies data
router.get('/', async (req, res) => {
  try {
    // the happy path goes here
    const data = await getAllPuppies()
    res.json(data)
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('getting puppies failed', error)
    res.sendStatus(500)
  }
})

// /api/v1/puppies/:id gives us the puppy with the same id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    res.json(await getPuppyById(id))
    // console.log(id)
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('getting puppy failed', error)
    res.sendStatus(500)
  }
})

// router.get('/', async (req, res) => {
//   res.json([])
// })

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    // res.json(await deletePuppy(id))

    // if (id === undefined) {
    //   res.sendStatus(404)
    //   return
    // }

    await deletePuppy(id)
    res.sendStatus(200)
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('deleting puppy failed', error)
    res.sendStatus(500)
  }
})

// Add puppy

router.post('/', async (req, res) => {
  const newPuppy = req.body

  const result = await createPuppy(newPuppy)
  res.json({id: result})
})
