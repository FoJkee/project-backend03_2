import {Router} from "express";
import {
    BlogDescriptionValidator,
    BlogNameValidator,
    BlogWebsiteUrlValidator, PostBlogIdValidator, PostContentValidator, PostShortDescriptionValidator,
    PostTitleValidator
} from "../validator/validators";
import {authBasicMiddleware} from "../validator/authBasicMiddleware";
import {errorsMiddleware} from "../validator/errorsMiddleware";

import {blogController, customValidator} from "../container";

export const blogRouter = Router({})

blogRouter.get('/', blogController.getBlog.bind(blogController))

blogRouter.post('/', authBasicMiddleware, BlogNameValidator, BlogDescriptionValidator, BlogWebsiteUrlValidator,
    errorsMiddleware, blogController.createBlog.bind(blogController))

blogRouter.get('/:blogId/posts', blogController.getPostForBlog.bind(blogController))

blogRouter.post('/:blogId/posts', authBasicMiddleware, PostTitleValidator, PostShortDescriptionValidator,
    PostContentValidator, errorsMiddleware, blogController.createPostForBlog.bind(blogController))

blogRouter.get('/:id', blogController.getBlogId.bind(blogController))

blogRouter.put('/:id', authBasicMiddleware, BlogNameValidator, BlogDescriptionValidator,
    BlogWebsiteUrlValidator, errorsMiddleware, blogController.updateBlogId.bind(blogController))

blogRouter.delete('/:id', authBasicMiddleware, blogController.deleteBlogId.bind(blogController))



