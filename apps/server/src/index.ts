import express, { Request, Response } from 'express'
import 'dotenv/config'

console.log(process.env.PORT)

const app = express()
const port = process.env.PORT

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`🤖 BEEP BOOP - Server is running at http://localhost:${port}`)
})
