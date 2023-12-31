import {Router} from "express";
import {commentsController} from "../container";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {CommentContentValidator, LikeStatusValidator} from "../validator/validators";
import {authBearerMiddleware} from "../validator/authBearerMiddleware";


export const commentsRouter = Router({})

commentsRouter.put('/:commentId', authBearerMiddleware, CommentContentValidator, errorsMiddleware,
    commentsController.updateCommentsId.bind(commentsController))

commentsRouter.delete('/:commentId', authBearerMiddleware,
    commentsController.deleteCommentsId.bind(commentsController))

commentsRouter.put('/:commentId/like-status', authBearerMiddleware, LikeStatusValidator, errorsMiddleware,
    commentsController.updateCommentsIdLikeStatus.bind(commentsController))

commentsRouter.get('/:id', commentsController.getCommentsId.bind(commentsController))