import express, { Request, Response } from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:5173", "http://127.0.0.1:5173"]}
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('message', (message) => {
    console.log(message)
    io.emit('message', `${socket.id.slice(0, 2)} said ${message}`)
  })
})


app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

httpServer.listen(PORT, () => {
  console.log(`🤖 BEEP BOOP - Server is running at http://localhost:${PORT}`)
})
