import {Router} from "express";
import {BlogDescriptionValidator, BlogNameValidator, BlogWebsiteUrlValidator} from "../validator/validators";
import {authBasicAuthMiddleware} from "../validator/authBasicAuthMiddleware";
import {errorsMiddleware} from "../validator/errorsMiddleware";

import {blogController} from "../container";

export const blogRouter = Router({})


blogRouter.get('/',
    blogController.getBlog.bind(blogController))

blogRouter.post('/',
    BlogNameValidator, BlogDescriptionValidator, BlogWebsiteUrlValidator, errorsMiddleware,
    blogController.createBlog.bind(blogController))

blogRouter.get('/:id/posts',
    blogController.getPostForBlog.bind(blogController))

blogRouter.post('/:blogId/posts', errorsMiddleware,
    blogController.createPostForBlog.bind(blogController))

blogRouter.get('/:id',
    blogController.getBlogId.bind(blogController))

blogRouter.put('/:id', authBasicAuthMiddleware,
    BlogNameValidator, BlogDescriptionValidator, BlogWebsiteUrlValidator, errorsMiddleware,
    blogController.updateBlogId.bind(blogController))

blogRouter.delete('/:id', authBasicAuthMiddleware,
    blogController.deleteBlogId.bind(blogController))



