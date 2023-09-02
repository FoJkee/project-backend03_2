import {body} from "express-validator";
import {blogService} from "../container";



export const customBlogIdValidator = body('blogId').custom(async (value, {req}) => {
        const blogData = await blogService.getBlogId(value)
        if (!blogData) throw new Error()
        req.body.blogName = blogData.name
        return true
    }
)

