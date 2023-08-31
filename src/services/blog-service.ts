import {BlogRepository} from "../repository/blog-repository";

const blogRepository = new BlogRepository()

export class BlogService {

    async getBlogs(searchNameTerm: string, sortBy: string,
                   sortDirection: string, pageNumber: number, pageSize: number): Promise<BlogClass[] | null> {

        return blogRepository.getBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize)
    }

    async getBlogsCount(searchNameTerm: string): Promise<number> {
        return blogRepository.getBlogsCount(searchNameTerm)
    }


    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogClass | null> {

        const newBlog = new BlogClass(
            new Date().getTime().toString(),
            name,
            description,
            websiteUrl,
            new Date().toISOString(),
            false
        )
        return blogRepository.createBlog(newBlog)
    }

    async getBlogId(id: string): Promise<BlogClass | null> {
        return blogRepository.getBlogId(id)

    }

    async updateBlogId(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return blogRepository.updateBlogId(id, name, description, websiteUrl)
    }

    async deleteBlogId(id: string): Promise<boolean> {
        return blogRepository.deleteBlogId(id)
    }
}


export class BlogClass {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public websiteUrl: string,
        public createdAt: string,
        public isMembership: boolean
    ) {
    }
}