import {PostRepository} from "../repository/post-repository";
import {PostType} from "../types/post-type";

const postRepository = new PostRepository()

export class PostService {
    async getCommentByPost() {

    }

    async createCommentByPost() {

    }

    async getPosts() {

    }

    async createPost(title: string, shortDescription: string, content: string, blogId: string, blogName: string): Promise<PostType | null> {

        const newPost = new PostType(
            new Date().getTime().toString(),
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            new Date().toISOString()
        )
        return postRepository.createPost(newPost)

    }

    async getPostsId(id: string) {
return postRepository.getPostsId(id)
    }

    async updatedPostId(id: string, title: string, shortDescription: string,
                        content: string, blogId: string): Promise<boolean> {
        return postRepository.updatedPostId(id, title, shortDescription, content, blogId)
    }

    async deletePostId(id: string) {


    }


}