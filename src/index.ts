import express from 'express'
import cookieParser from 'cookie-parser'

const port = 4000
const app = express()

app.use(cookieParser())





const start = async () => {
    try{
        app.listen(port, () => console.log(`Server started on port ${port}`))

    } catch (e){
        console.log(e)
    }

}
start()