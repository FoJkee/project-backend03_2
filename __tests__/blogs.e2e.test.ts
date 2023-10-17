import request from "supertest";

import mongoose from "mongoose";

import {config} from "dotenv";

import {BlogType} from "../src/types/blog-type";
import {app} from "../src/settings";

config();


const dbName = 'hw'
const URL = process.env.DB_URL || `mongodb://127.0.0.1:27017/${dbName}`

describe('Mongoose integration', () => {

    let newBlog: BlogType | null = null

    beforeAll(async () => {

        await mongoose.connect(URL)
        await request(app).delete('/testing/all-data').expect(204)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

    describe('GET blog', () => {
        it('GET', async () => {
            const res = await request(app).get('/blogs').expect(200)
            expect(res.body.items.length).toBe(0)
        })
    })

    describe('POST blogs', () => {

        it('-POST blog does not create the blogs with incorrect data', async () => {
            await request(app)
                .post('/blogs')
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')
                .send({})
                .expect(400, {
                    errorsMessages: [{
                        message: "name is required",
                        field: "name",
                    },
                        {
                            message: "description is required",
                            field: "description"
                        },
                        {
                            message: "websiteUrl is required",
                            field: "websiteUrl"
                        }
                    ]
                })

            const res = await request(app).get('/blogs')
            expect(res.body.items.length).toBe(0)
        })

        it('-POST blogs, does not create the blogs with incorrect data(authorisation)', async () => {
            await request(app)
                .post('/blogs')
                .send({})
                .expect(401)
            const res = await request(app).get('/blogs')
            expect(res.body.items.length).toBe(0)
        })
    })

    describe('GET:id', () => {

        it('-GET dont blog for id', async () => {
            await request(app)
                .get('/blogs/1234')
                .expect(404)
        })

        it('+GET', async () => {
            await request(app).get('/blogs/' + newBlog.id).expect(200)
        });

    })

    describe('PUT', () => {

        it('-PUT has incorrect values', async () => {
            await request(app)
                .put('/blogs/' + newBlog.id)
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')
                .send({name: "name"})
                .expect(400, {
                    errorsMessages: [
                        {
                            message: "description is required",
                            field: "description"
                        },
                        {
                            message: "websiteUrl is required",
                            field: "websiteUrl"
                        }
                    ]
                })

        })

        it('-PUT, not auth', async () => {
            await request(app)
                .put('/blogs' + newBlog.id)
                .send({
                    name: 'name',
                    description: "description",
                    websiteUrl: 'websiteUrl'
                })
                .expect(401)
        })

        it('-PUT, not auth', async () => {
            await request(app)
                .put('/blogs' + newBlog.id)
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')
                .send({
                    name: 'name',
                    description: "description",
                    websiteUrl: 'websiteUrl'
                })
                .expect(404)
    })

        it('+PUT', async () => {
            await request(app)
                .put('/blogs/' + newBlog.id)
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')
                .send({
                    name: 'name',
                    description: "description",
                    websiteUrl: 'websiteUrl'
                })
                .expect(204)

            const result = await request(app).get('/blogs' + newBlog.id)
            const updateResult = result.body

            const res = await request(app).get('/blogs')
            const resBlog = res.body.items.find((i: BlogType) => i.id === newBlog.id)
            expect(resBlog).toEqual({
                id: updateResult.id,
                name: updateResult.name,
                description: updateResult.description,
                websiteUrl: updateResult.websiteUrl,
                createdAt: updateResult.createdAt,
                isMembership: updateResult.isMembership
            })
            newBlog = updateResult
        })

    })

    describe('DELETE', () => {
        it('+DELETE blogs valid Id', async () => {
            await request(app)
                .delete("/blogs/" + newBlog.id)
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')
                .expect(204)
            const res = await request(app).get('/blogs')
            expect(res.body.items.length).toEqual(res.body.items.length - 1)

        })


        it('-DELETE does not deleted with auth and id', async () => {
            await request(app)
                .delete('/blogs/1231414')
                .expect(401)

            const res = await request(app).get('/blogs')
            expect(res.body.items.length).toBe(res.body.items.length)
        })

        it('-DELETE does not delete with id', async () => {
            await request(app)
                .delete('/blogs/1231414')
                .expect(404)
                .set('authorization', 'Basic YWRtaW46cXdlcnR5')

            const res = await request(app).get('/blogs')
            expect(res.body.items.length).toBe(res.body.items.length)


        })

    })

})
