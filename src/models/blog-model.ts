import mongoose, {ObjectId} from "mongoose";

type BlogDbType = {
    _id: ObjectId
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

const BlogSchema = new mongoose.Schema<BlogDbType>({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    createdAt: {type: String, required: true},
    isMembership: {type: Boolean, default: false}
})
export const BlogModels = mongoose.model<BlogDbType>('blogs', BlogSchema)



