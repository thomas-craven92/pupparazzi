import express from 'express'

// Import your router here

const server = express()

// Server configuration
server.use(express.json())

// Your routes/router(s) should go here
import puppies from './routes/puppies.ts'

server.use(express.json())
server.use('/api/v1/puppies', puppies)

export default server
