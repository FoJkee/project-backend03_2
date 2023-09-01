import {Router} from "express";
import {BlogController} from "../controllers/blog-controller";
import {BlogDescriptionValidator, BlogNameValidator, BlogWebsiteUrlValidator} from "../validator/validators";
import {authBasicAuthMiddleware} from "../validator/authBasicAuthMiddleware";
import {errorsMiddleware} from "../validator/errorsMiddleware";

export const blogRouter = Router({})

const blogController = new BlogController()

blogRouter.get('/', blogController.getBlog)

blogRouter.post('/', authBasicAuthMiddleware,
    BlogNameValidator, BlogDescriptionValidator, BlogWebsiteUrlValidator, errorsMiddleware, blogController.createBlog)

blogRouter.get('/:id/posts', blogController.getPostForBlog)

blogRouter.post('/:id/posts', authBasicAuthMiddleware, errorsMiddleware, blogController.createPostForBlog)

blogRouter.get('/:id', blogController.getBlogId)

blogRouter.put('/:id', authBasicAuthMiddleware,
    BlogNameValidator, BlogDescriptionValidator, BlogWebsiteUrlValidator, errorsMiddleware, blogController.updateBlogId)

blogRouter.delete('/:id', authBasicAuthMiddleware, blogController.deleteBlogId)



