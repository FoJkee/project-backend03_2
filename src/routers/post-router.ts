import {Router} from "express";
import {
    CommentContentValidator,
    PostBlogIdValidator,
    PostContentValidator,
    PostShortDescriptionValidator,
    PostTitleValidator
} from "../validator/validators";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {customValidator, postController} from "../container";
import {authBasicMiddleware} from "../validator/authBasicMiddleware";
import {authBearerMiddleware} from "../validator/authBearerMiddleware";


export const postRouter = Router({})

postRouter.get('/:postId/comments', postController.getCommentByPost.bind(postController))

postRouter.post('/:postId/comments',
    authBearerMiddleware,
    CommentContentValidator, errorsMiddleware,
    postController.createCommentByPost.bind(postController))

postRouter.get('/', postController.getPosts.bind(postController))
postRouter.post('/',authBasicMiddleware, PostTitleValidator, PostShortDescriptionValidator, PostContentValidator, PostBlogIdValidator,
    customValidator.customBlogIdValidator.bind(customValidator), errorsMiddleware,
    postController.createPost.bind(postController))
postRouter.get('/:id', postController.getPostsId.bind(postController))
postRouter.put('/:id', authBasicMiddleware, postController.updatedPostId.bind(postController))
postRouter.delete('/:id', authBasicMiddleware, postController.deletePostId.bind(postController))