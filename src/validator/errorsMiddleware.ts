import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export const errorsMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const errMes = ({msg, path}: any) => {

        return {
            message: msg,
            field: path
        }
    }

    const errResult = validationResult(req).formatWith(errMes)
    if (!errResult.isEmpty()) {
        res.status(400).json({errorsMessages: errResult.array({onlyFirstError: this})})
    } else {
        next()
    }

}