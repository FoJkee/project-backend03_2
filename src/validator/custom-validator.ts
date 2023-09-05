import {body} from "express-validator";



// export const customBlogIdValidator = body('blogId').custom(async (name, {req}) => {
//         const blogData = await blogService.getBlogId(name)
//         if (!blogData) throw new Error()
//         req.body.blogName = blogData.name
//         return true
//     }
// )

