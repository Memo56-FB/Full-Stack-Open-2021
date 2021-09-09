const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("notes are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
})
test("contain id",async () => {
    const response = await api.get("/api/blogs")
    expect(response.body.map(body => body.id)).toBeDefined()
})

afterAll(()=>{
    mongoose.connection.close()
})