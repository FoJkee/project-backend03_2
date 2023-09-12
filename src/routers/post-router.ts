import {Router} from "express";
import {
    PostBlogIdValidator,
    PostContentValidator,
    PostShortDescriptionValidator,
    PostTitleValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {customValidator, postController} from "../container";
import {authBasicAuthMiddleware} from "../validator/authBasicAuthMiddleware";


export const postRouter = Router({})

postRouter.get('/:postId/comments', postController.getCommentByPost.bind(postController))
postRouter.post('/:postId/comments', postController.createCommentByPost.bind(postController))
postRouter.get('/', postController.getPosts.bind(postController))
postRouter.post('/',authBasicAuthMiddleware, PostTitleValidator, PostShortDescriptionValidator, PostContentValidator, PostBlogIdValidator,
    customValidator.customBlogIdValidator.bind(customValidator), errorsMiddleware,
    postController.createPost.bind(postController))
postRouter.get('/:id', postController.getPostsId.bind(postController))
postRouter.put('/:id', authBasicAuthMiddleware, postController.updatedPostId.bind(postController))
postRouter.delete('/:id', authBasicAuthMiddleware, postController.deletePostId.bind(postController))