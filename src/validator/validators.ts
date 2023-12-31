import {body} from "express-validator";
import exp from "constants";
import {LikeInfoEnum} from "../types/comment-type";



export const BlogNameValidator = body('name')
    .trim()
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .isLength({min: 1, max: 15})
    .withMessage('name should 1 - 15 symbols')

export const BlogDescriptionValidator = body('description')
    .trim()
    .notEmpty()
    .withMessage('description is required')
    .isString()
    .isLength({min: 1, max: 500})
    .withMessage('description should 2 - 500 symbols')

export const BlogWebsiteUrlValidator = body('websiteUrl')
    .trim()
    .notEmpty()
    .withMessage('websiteUrl is required')
    .isString()
    .isLength({min: 1, max: 100})
    .withMessage('websiteUrl should 2 - 500 symbols')
    .matches("^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$")
    .withMessage('not correct')

export const PostTitleValidator = body('title')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isString()
    .isLength({min: 1, max: 30})
    .withMessage('title should 2 - 30 symbols')

export const PostShortDescriptionValidator = body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('shortDescription is required')
    .isString()
    .isLength({min: 1, max: 100})
    .withMessage('shortDescription should 1 - 100 symbols')

export const PostContentValidator = body('content')
    .trim()
    .notEmpty()
    .withMessage('content is required')
    .isString()
    .isLength({min: 1, max: 300})
    .withMessage('content should 1 - 300 symbols')

export const PostBlogIdValidator = body('blogId')
    .trim()
    .isString()
    .withMessage('blogId is required')

export const CommentContentValidator = body('content')
    .trim()
    .notEmpty()
    .withMessage('content is required')
    .isString()
    .withMessage('2')
    .isLength({min: 20, max: 300})
    .withMessage('content should 20 - 300 symbols')



export const UserLoginValidator = body('login')
    .trim()
    .notEmpty()
    .withMessage('login is required')
    .isString()
    .isLength({min: 3, max: 10})
    .withMessage('login should 3 - 10 symbols')
    .matches("^[a-zA-Z0-9_-]*$")
    .withMessage('not correct')

export const UserPasswordValidator = body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isString()
    .isLength({min: 6, max: 20})
    .withMessage('password should 6 - 20 symbols')


export const UserEmailValidator = body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage('not correct')

export const LoginOrEmailValidator = body('loginOrEmail')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('loginOrEmail is required')

export const NewPasswordValidator = body('newPassword')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6, max:20})
    .withMessage('newPassword should 6 - 20 symbols')

export const RecoveryCodeValidator = body('recoveryCode')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('recoveryCode is required')

export const CodeValidator = body('code')
    .trim()
    .notEmpty()
    .withMessage('code is required')


export const LikeStatusValidator = body('likeStatus')
    .trim()
    .notEmpty()
    .withMessage('likeStatus is required')
    .isString()
    .isIn(Object.values(LikeInfoEnum))
    .withMessage('not correct')

