import {Router} from "express";
import {commentsController} from "../container";
import {errorsMiddleware} from "../validator/errorsMiddleware";
import {CommentContentValidator} from "../validator/validators";


export const commentsRouter = Router({})

commentsRouter.put('/:commentId', CommentContentValidator, errorsMiddleware,
    commentsController.updateCommentsId.bind(commentsController))

commentsRouter.delete('/:commentId',
    commentsController.deleteCommentsId.bind(commentsController))

commentsRouter.get('/:id', commentsController.getCommentsId.bind(commentsController))