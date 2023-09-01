import {Router} from "express";
import {PostController} from "../controllers/post-controller";
import {
    PostBlogIdValidator,
    PostContentValidator,
    PostShortDescriptionValidator,
    PostTitleValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {customBlogIdValidator} from "../validator/custom-validator";


const postController = new PostController()

export const postRouter = Router({})

postRouter.get('/:id/comments', postController.getCommentByPost)
postRouter.post('/:id/comments', postController.createCommentByPost)
postRouter.get('/', postController.getPosts)
postRouter.post('/', PostTitleValidator, PostShortDescriptionValidator, PostContentValidator,
    PostBlogIdValidator, customBlogIdValidator, errorsMiddleware, postController.createPost)
postRouter.get('/:id', postController.getPostsId)
postRouter.put('/:id', postController.updatedPostId)
postRouter.delete('/:id', postController.deletePostId)