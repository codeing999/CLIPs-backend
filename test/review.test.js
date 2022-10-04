require("dotenv").config();
const app = require("../src/app");
const request = require("supertest");
const { sequelize } = require('../src/sequelize/models');
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg3ODc1LCJpYXQiOjE2NjQ5MDY2OTIsImV4cCI6MTY2NDkxMDI5Mn0.2pjOr90088k6tlL1Uhl8H5_E_PlgXGD3lWxFZ7v2X3E'

beforeAll(async () => {
    await sequelize.sync();
});

jest.setTimeout(10000);

describe("약속 후기 CRUD", () => {
    
    test("get /api/review 전체조회", (done) => {
        request(app)
        .get(`/api/review`)
        .set('Authorization', `Bearer ${accessToken}` )
        .set('Origin', "https://clipspromise.com")
        .expect(200, done);
    })

    test("post /api/review/:promiseId", (done) => {

        request(app)
        .post(`/api/review/18bwy7e8tqiohfacp`)
        .field('content', '한글자로 바꿔놨지?')
        .attach('image', 'test/krw-eur.png')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Origin', "https://clipspromise.com")
        .expect(200, done);
    })

    test("put /api/review/:reviewId", (done) => {
        request(app)
        .put(`/api/review/1`)
        .field('content', '(수정)한글자로 바꿔놨지?')
        .attach('image', 'test/krw-eur.png')
        .set('Content-Type', 'multipart/form-data')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Origin', "https://clipspromise.com")
        
        .expect(200, done);
    })

    test("delete /api/review/:reviewId", (done) => {
        request(app)
        .delete(`/api/review/1`)
        .set('Authorization', `Bearer ${accessToken}`)
        .set('Origin', "https://clipspromise.com")
        .expect(200, done);
    })
})

// afterAll(async () => {
//     await sequelize.sync({ force: true });
//   });