require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");
// const { sequelize } = require('../models');
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NDU1NjQ5NywiZXhwIjoxNjY0NTYwMDk3fQ.4ZW812ft-CTGlEyAjN8AmTb-vpjRhdPYlr3yoQRBq60'

jest.setTimeout(10000);

beforeAll(done => {
    done()
  })
  
// beforeAll(async () => {
//     await sequelize.sync();
// });

describe("약속 CRUD", () => {

    test("post /api/promise", (done) => {
        const title = "봄"
        const date= "2023.04.13 00:00"
        const x = "127.032695"
        const y = "37.486450"
        const penalty = "송편"
        const friendList= "[{nickname:박혜민}]"
        const nickname = "박혜민"
        const location = "서울특별시 서초구 바우뫼로 91"

        request(app)
        .post(`/api/post`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, date, x, y, penalty, friendList, nickname, location })
        .expect(200, done);
    })

    test("get /api/promise/:promiseId 약속 상세 조회", (done) => {
        request(app)
        .get(`/api/promise/1`)
        .expect(200, done);
    })

    test("put /api/promise/:promiseId", (done) => {
        const title = "봄"
        const date= "2023.04.13 00:00"
        const x = "127.032695"
        const y = "37.486450"
        const penalty = "송편"
        const friendList= "[{nickname:박혜민}]"
        const nickname = "박혜민"
        const location = "서울특별시 서초구 바우뫼로 91"
        request(app)
        .put(`/api/promise/123`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ title, date, x, y, penalty, friendList, nickname, location })
        .expect(200, done);
    })

    test("delete /api/promise/:promiseId", (done) => {
        request(app)
        .delete(`/api/promise/123`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    })
})

// afterAll(async () => {
//     await sequelize.sync({ force: true });
// });

afterAll(done => {
    app.close();
    done();
});