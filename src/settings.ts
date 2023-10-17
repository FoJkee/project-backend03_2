import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {blogRouter} from "./routers/blog-router";
import {postRouter} from "./routers/post-router";
import {userRouter} from "./routers/user-router";
import {testingRouter} from "./routers/testing-router";
import {commentsRouter} from "./routers/comments-router";
import {authRouter} from "./routers/auth-router";
import {securityDeviceRouter} from "./routers/securityDevice-router";

export const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.set('trust proxy', true)


app.use('/blogs', blogRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/testing/all-data', testingRouter)
app.use('/comments', commentsRouter)
app.use('/auth', authRouter)
app.use('/devices', securityDeviceRouter)


app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})