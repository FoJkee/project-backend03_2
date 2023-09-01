import dotenv from 'dotenv'
import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import {blogRouter} from "./routers/blog-router";
import {testingRouter} from "./routers/testing-router";
import {postRouter} from "./routers/post-router";

dotenv.config()

const PORT = process.env.PORT || 4000
const dbName = 'hw'
const URL = process.env.DB_URL || `mongodb://127.0.0.1:27017/${dbName}`
const app = express()

app.use(express.json())
app.use(cookieParser())


app.use('/blogs', blogRouter)
app.use('/posts', postRouter)
app.use('/testing/all-data', testingRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('hello')

})





const start = async () => {
    try{
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e){
        console.log(e)
        await mongoose.disconnect()
    }

}
start()