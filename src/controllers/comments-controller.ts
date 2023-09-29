import {CommentsService} from "../services/comments-service";
import {Request, Response} from "express";
import {JwtService} from "../services/jwt-service";
import {LikeService} from "../services/like-service";
import {bearerUserIdFromHeaders} from "./bearerUserIdFromHeaders";


export class CommentsController {
    constructor(private commentsService: CommentsService,
                protected jwtService: JwtService,
                protected likeService: LikeService) {
    }

    async updateCommentsId(req: Request, res: Response) {

        const {commentId} = req.params
        const {content} = req.body

        const getComments = await this.commentsService.getCommentsId(commentId)

        if (!getComments) {
            res.sendStatus(404)
            return
        }
        if (req.userId!.id !== getComments.commentatorInfo.userId) res.sendStatus(403)

        const updateComment = await this.commentsService.updateCommentsId(commentId, content)
        if (updateComment) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }

    }

    async updateCommentsIdLikeStatus(req: Request, res: Response) {

        const {commentId} = req.params
        const {likeStatus} = req.body
        const userId = req.userId!.id



        const comment = await this.commentsService.updateLikeStatus(commentId, likeStatus, userId)
        if (!comment) return res.sendStatus(404)
        return res.sendStatus(204)

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

        if (!getComments) return res.sendStatus(404)

        const userId = await bearerUserIdFromHeaders(req.headers.authorization)

        if (userId) {

            const isUserLiked = await this.commentsService.getUserLikeStatus(id, userId)

            if(isUserLiked) {
                getComments.likesInfo.myStatus = isUserLiked.status
            }
        }
        return res.status(200).send(getComments)


    }
}