import {randomUUID} from "crypto";

export type Paginated<T> = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: T[]

}

export class BlogType {
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

export interface CreateBlogInterfaceExample { // || type
    name: string,
    description: string,
    websiteUrl: string,
}


export class BlogExample {
    public id: string = randomUUID()
    public name: string
    public description: string
    public websiteUrl: string
    public createdAt: string = new Date().toISOString()
    public isMembership: boolean = false

    constructor(dto: CreateBlogInterfaceExample) {
        this.name = dto.name
        this.description = dto.description
        this.websiteUrl = dto.websiteUrl
    }
}

const input: CreateBlogInterfaceExample ={
    name: '123',
    description: 'desc',
    websiteUrl: '.com'
}

const blog = new BlogExample(input)