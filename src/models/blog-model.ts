import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: String, required: true},
    isMembership: {type: Boolean, default: false}
})
export const BlogModels = mongoose.model('blogs', BlogSchema)



