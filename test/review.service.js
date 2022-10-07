// const ReviewService = require("../src/layers/services/review.service");
// const {함수명} = require("../src/layers/services/review.service");
const authmiddleware = require("../src/layers/middlewares/auth.middleware");
const deleteImage = require("../src/layers/middlewares/deleteImage.middleware");
const image = require("../src/layers/middlewares/image.middleware");

// import Review from "../src/sequelize/models/review";
// import ReviewImage from "../src/sequelize/models/reviewImage";
// import reviewRepository from "../src/layers/repositories/review.repository"; //* as
// import deleteImage from "../src/layers/middlewares/deleteImage.middleware";
// import image from "../src/layers/middlewares/image.middleware";
// import auth from "../src/layers/middlewares/auth.middleware";

describe("createReview", () => {
//   const content = "1";
//   const image = "2";
//   const promiseId = "3";
  const req = {
    content:"별거 아냐",
    image:"akdsmfasfnag"
  }

  test("리뷰 작성 성공 시 success를 호출", async () => {
    await reviewRepository(req);
    expect(reviewRepository).toBeCalledTimes(1);
  });

  test("리뷰 작성 실패 시 error 응답", async () => {
    await reviewRepository(req);
    expect(reviewRepository).toBeCalledWith(error);
  });
}),

describe("getReview, review_register", () => {
const reviewId = "1";
const promiseId = "2";
const reviewRepository = reviewRepository.getReview;

test("get api/review/:promiseId //리뷰 조회 성공시 reviewRepository 호출", async () => {
    Review.findOne.mockReturnValue(Promise.resolve({ reviewId: "1" }));
    ReviewImage.findOne.mockReturnValue(Promise.resolve({ reviewId: "1" }));
    await reviewRepository(reviewId);
    expect(reviewRepository).toBeCalledTimes(2);
});
}),
describe("updateReview, review_register", () => {
const content = "1";
const image = "2";
const reviewId = "3";
const reviewRepository = reviewRepository.updateReview;

test("put api/review/:promiseId //리뷰 수정 성공 시 reviewRepository 호출", async () => {
    await reviewRepository(content, image, reviewId);
    expect(reviewRepository).toBeCalledTimes(2);
});
}),
describe("deleteReview, review_register", () => {
const reviewId = "1";
const reviewRepository = reviewRepository.deleteReview;

test("delete api/review/:promiseId //리뷰 삭제 성공 시 reviewRepository 호출", async () => {
    await reviewRepository(reviewId);
    expect(reviewRepository).toBeCalledTimes(2);
});
});

// test('2번 게시물을 삭제 : delete', (done) => {
//     agent
//         .delete('/api/posts/2')
//         .set('authorization', `Bearer ` + token)
//         .expect(200)
//         .end((err, res) => {
//             console.log('2번 게시물, 이미지 삭제');
//             done();
//         });
//     }),

// test('존재하지 않는 유저 정보 조회하기(실패)', (done) => {
//     request(app)
//         .get('/api/users/3')
//         .set('authorization', `Bearer ` + token)
//         .expect(500, done);
// })
