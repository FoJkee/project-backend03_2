import {Router} from "express";
import {BlogController} from "../controllers/blog-controller";

export const blogRouter = Router({})

const blogController = new BlogController()

blogRouter.get('/', blogController.getBlog)
blogRouter.post('/', blogController.createBlog)
blogRouter.get('/:id/posts', blogController.getPostForBlog)
blogRouter.post('/:id/posts', blogController.createPostForBlog)
blogRouter.get('/:id', blogController.getBlogId)
blogRouter.put('/:id', blogController.updateBlogId)
blogRouter.delete('/:id', blogController.deleteBlogId)



