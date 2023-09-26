import mongoose from "mongoose";


const rateSchema = new mongoose.Schema({
    url: {type: String, required: true},
    ip: {type: String, required:  true},
    date: {type: Date, required: true}
})


export const RateModel = mongoose.model('limitDevice', rateSchema)