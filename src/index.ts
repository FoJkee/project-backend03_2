import dotenv from 'dotenv'
import mongoose from "mongoose";
import {app} from "./settings";

dotenv.config()

const PORT = process.env.PORT || 4000
const dbName = 'hw'
const URL = process.env.DB_URL || `mongodb://127.0.0.1:27017/${dbName}`


const start = async () => {
    try {
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    } catch (e) {
        console.log(e)
        await mongoose.disconnect()
    }

}
start()