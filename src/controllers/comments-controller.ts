import {CommentsService} from "../services/comments-service";
import {Request, Response} from "express";
import {JwtService} from "../services/jwt-service";
import {LikeService} from "../services/like-service";
import {LikeInfoEnum} from "../types/comment-type";


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

        const {commentsId} = req.params
        const {likeStatus} = req.body
        const userId: any = req.userId


        const comment = await this.commentsService.updateLikeStatus(commentsId, likeStatus, userId)

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

        const token = req.headers.authorization?.split(' ')[1]
        let data = null

        if (token) data = await this.jwtService.verifyUserById(token)


        if (getComments && data && data.userId) {
            const userStatusInfo = await this.likeService.getCommentStatus(data!.userId, getComments.id)


            res.status(200).json({
                ...getComments, likeInfo: {
                    ...getComments.likesInfo,
                    myStatus: userStatusInfo ? userStatusInfo.status : LikeInfoEnum.None
                }
            })
        }
        return res.sendStatus(404)

    }
}