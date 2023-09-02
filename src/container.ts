import {BlogRepository} from "./repository/blog-repository";
import {BlogService} from "./services/blog-service";
import {BlogController} from "./controllers/blog-controller";
import {PostRepository} from "./repository/post-repository";
import {PostService} from "./services/post-service";
import {PostController} from "./controllers/post-controller";

// blogs
const blogRepository = new BlogRepository()
export const blogService = new BlogService(blogRepository)

// posts
const postRepository = new PostRepository()
const postService = new PostService(postRepository)

export const postController = new PostController(postService, blogService)
export const blogController = new BlogController(blogService, postService)

// const PostSvc = new PS(new PostRepo (), BlogRepo)

