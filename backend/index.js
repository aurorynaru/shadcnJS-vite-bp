import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
const app = express()
import proxyRoute from './routes/proxyRoute.js'
dotenv.config()
app.use(express.json())

app.use(cors())

app.use('/proxy', proxyRoute)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`listening on ${port}`)
})
