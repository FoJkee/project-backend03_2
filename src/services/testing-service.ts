import {TestingRepository} from "../repository/testing-repository";


const testingRepository = new TestingRepository()

export class TestingService {
    async deleteAllBlogs(): Promise<boolean>{
        return testingRepository.deleteAllBlogs()
    }

    async deleteAllPosts(): Promise<boolean>{
        return testingRepository.deleteAllPosts()
    }
}