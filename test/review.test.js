require("dotenv").config();
const app = require("/src/app");
const request = require("supertest");
accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY2NDM3MjEyNywiZXhwIjoxNjY0Mzc1NzI3fQ.GxvAxHlt6tByhTCDIkKUM5KteFo5ALzfjNyj422G4sE'

jest.setTimeout(10000);

describe("약속 후기 CRUD", () => {

    test("post /api/review/:promiseId", (done) => {
        const content = "테스트"
        const image = "테스트"
        request(app)
        .post(`/api/review/w1gog7am5hv9bxma5ua`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ content, image })
        .expect(200, done);
    })

    test("get /api/review 전체조회", (done) => {
        request(app)
        .get(`/api/review`)
        .expect(200, done);
    })

    test("put /api/review/:reviewId", (done) => {
        const content = "테스트(수정)"
        const image = "테스트(수정)"
        request(app)
        .put(`/api/reviews/123`)
        .set('Authorization', `Bearer ${accessToken}` )
        .send({ content, image })
        .expect(200, done);
    })

    test("delete /api/review/:reviewId", (done) => {
        request(app)
        .delete(`/api/reviews/123`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200, done);
    })

})