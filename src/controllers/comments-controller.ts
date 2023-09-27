import {CommentsService} from "../services/comments-service";
import {Request, Response} from "express";


export class CommentsController {
    constructor(private commentsService: CommentsService) {
    }

    async updateCommentsId(req: Request, res: Response) {

        const {id} = req.params
        const {content} = req.body

        const getComments = await this.commentsService.getCommentsId(id)

        if (!getComments) {
            res.sendStatus(404)
            return
        }

        if (req.userId!.id !== getComments.commentatorInfo.userId) res.sendStatus(403)

        const updateComment = await this.commentsService.updateCommentsId(id, content)
        if (updateComment) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }

    async updateCommentsIdLikeStatus(req: Request, res: Response){

        const {commentsId} = req.params
        const {likeStatus} = req.body
        const userId = req.userId





    }

    async deleteCommentsId(req: Request, res: Response) {
        const {id} = req.params

        const getComments = await this.commentsService.getCommentsId(id)

        if (!getComments) {
            res.sendStatus(404)
            return
        }

        if (req.userId!.id !== getComments.commentatorInfo.userId) res.sendStatus(403)

        const deleteComments = await this.commentsService.deleteCommentsId(id)
        if (deleteComments) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }

    async getCommentsId(req: Request, res: Response) {
        const {id} = req.params
        const getComments = await this.commentsService.getCommentsId(id)
        if (getComments) {
            res.status(200).json(getComments)
        } else {
            res.sendStatus(404)
        }
    }
}