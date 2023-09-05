import {Router} from "express";
import {
    PostBlogIdValidator,
    PostContentValidator,
    PostShortDescriptionValidator,
    PostTitleValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
// import {customBlogIdValidator} from "../validator/custom-validator";
import {postController} from "../container";


export const postRouter = Router({})

postRouter.get('/:id/comments', postController.getCommentByPost.bind(postController))
postRouter.post('/:id/comments', postController.createCommentByPost.bind(postController))
postRouter.get('/', postController.getPosts.bind(postController))
postRouter.post('/', PostTitleValidator, PostShortDescriptionValidator, PostContentValidator,
    PostBlogIdValidator, /*customBlogIdValidator*/ errorsMiddleware, postController.createPost.bind(postController))
postRouter.get('/:id', postController.getPostsId.bind(postController))
postRouter.put('/:id', postController.updatedPostId.bind(postController))
postRouter.delete('/:id', postController.deletePostId.bind(postController))