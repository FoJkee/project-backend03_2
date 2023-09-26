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
import {CustomValidator} from "./validator/custom-validator";
import {JwtService} from "./services/jwt-service";
import {SecurityDeviceService} from "./services/securityDevice-service";
import {SecurityDeviceRepository} from "./repository/securityDevice-repository";
import {SecurityDeviceController} from "./controllers/securityDevice-controller";
import {EmailService} from "./services/email-service";
import {RateLimitDeviceRepository} from "./repository/rateLimitDevice-repository";
import {RateLimitDeviceService} from "./services/rateLimitDevice-service";


const userRepository = new UserRepository()

// blogs
export const blogRepository = new BlogRepository()
export const blogService = new BlogService(blogRepository)

// posts
const postRepository = new PostRepository()
const postService = new PostService(postRepository, userRepository, blogRepository)


// comments
const commentsRepository = new CommentsRepository()
const commentsService = new CommentsService(commentsRepository)

export const userService = new UserService(userRepository)

export const jwtService = new JwtService()
export const authService = new AuthService(userService)

const securityDeviceRepository = new SecurityDeviceRepository()
export const securityDeviceService = new SecurityDeviceService(securityDeviceRepository)

const emailService = new EmailService()

const rateLimitDeviceRepository = new RateLimitDeviceRepository()
// const rateLimitDeviceService = new RateLimitDeviceService(rateLimitDeviceRepository)


// controllers
export const blogController = new BlogController(blogService, postService)
export const postController = new PostController(postService, blogService)
export const userController = new UserController(userService)
export const testController = new TestingController(blogService, postService, userService, securityDeviceService)
export const commentsController = new CommentsController(commentsService)
export const authController = new AuthController(userService, authService, jwtService, securityDeviceService, emailService)
export const customValidator = new CustomValidator(userService, blogService)
export const securityDeviceController = new SecurityDeviceController(securityDeviceService, jwtService)
// export const rateLimitDeviceController = new RateLimitMiddleware(rateLimitDeviceService)



