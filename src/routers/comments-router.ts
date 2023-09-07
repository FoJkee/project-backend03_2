import {Router} from "express";
import {commentsController} from "../container";


export const commentsRouter = Router({})

commentsRouter.put('/:commentId', commentsController.updateCommentsId.bind(commentsController))
commentsRouter.delete('/:commentId', commentsController.deleteCommentsId.bind(commentsController))
commentsRouter.get('/:id', commentsController.getCommentsId.bind(commentsController))