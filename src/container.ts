import {BlogRepository} from "./repository/blog-repository";
import {BlogService} from "./services/blog-service";
import {BlogController} from "./controllers/blog-controller";
import {PostRepository} from "./repository/post-repository";
import {PostService} from "./services/post-service";
import {PostController} from "./controllers/post-controller";
import {TestingController} from "./controllers/testing-controller";
import {UserRepository} from "./repository/user-repository";
import {UserService} from "./services/user-service";
import {UserController} from "./controllers/user-controller";
import {CommentsRepository} from "./repository/comments-repository";
import {CommentsService} from "./services/comments-service";
import {CommentsController} from "./controllers/comments-controller";
import {AuthController} from "./controllers/auth-controller";
import {AuthService} from "./services/auth-service";
import {EmailService} from "./services/email-service";
import {CustomValidator} from "./validator/custom-validator";


const userRepository =  new UserRepository()

// blogs
const blogRepository = new BlogRepository()
const blogService = new BlogService(blogRepository)

// posts
const postRepository = new PostRepository()
const postService = new PostService(postRepository , userRepository)

// users


// comments
const commentsRepository = new CommentsRepository()
const commentsService = new CommentsService(commentsRepository)


const authService = new AuthService(userRepository)
const emailService = new EmailService()
const userService = new UserService(userRepository, emailService)




// controllers
export const blogController = new BlogController(blogService, postService)
export const postController = new PostController(postService, blogService)
export const userController = new UserController(userService)
export const testController = new TestingController(blogService, postService, userService)
export const commentsController = new CommentsController(commentsService)
export const authController = new AuthController(userService, emailService)

export const customValidator = new CustomValidator(userService)


// const PostSvc = new PS(new PostRepo (), BlogRepo)

