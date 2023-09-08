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


const userRepository =  new UserRepository()

// blogs
const blogRepository = new BlogRepository()
const blogService = new BlogService(blogRepository)

// posts
const postRepository = new PostRepository()
const postService = new PostService(postRepository , userRepository)

// users
const userService = new UserService(userRepository)

// comments
const commentsRepository = new CommentsRepository()
const commentsService = new CommentsService(commentsRepository)



// controllers
export const blogController = new BlogController(blogService, postService)
export const postController = new PostController(postService, blogService)
export const userController = new UserController(userService)
export const testController = new TestingController(blogService, postService, userService)
export const commentsController = new CommentsController(commentsService)

// const PostSvc = new PS(new PostRepo (), BlogRepo)

