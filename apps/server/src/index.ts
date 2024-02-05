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
  console.log('user connected:', socket.id)

  socket.on('send', (message) => {
    console.log(message)
    io.emit('receive', `${socket.id.slice(0, 2)} said ${message}`)
  })
})


app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

httpServer.listen(PORT, () => {
  console.log(`🤖 BEEP BOOP - Server is running at http://localhost:${PORT}`)
})
