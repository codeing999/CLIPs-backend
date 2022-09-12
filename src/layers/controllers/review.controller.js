const joi = require("joi");
const Validation = require("../../modules/joiStorage");
const { use } = require("../routers/review.router");
const ReviewService = require("../services/review.service");

module.exports = class ReviewController {
  reviewService = new ReviewService();
  validation = new Validation();

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    const { content } = req.body;
    const reviewImageUrl = req.files; //[{하나},{하나}]
    console.log(reviewImageUrl)
    const image = reviewImageUrl.map((row) => row.location); //['주소', '주소']
    const user_id = res.locals.userId;

    // console.log("controller", image, user_id, content)

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
        })
        .validateAsync({ content });

      const getReview = await this.reviewService.createReview(
        content,
        image,
        promiseId
      );
      return res.json({
        data:getReview,
        message: `게시글 ${promiseId}의 후기, 내용: ${content}, 링크 : ${image}` 
      });
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const { promiseId, reviewId } = req.params;
    console.log("user_id", user_id);
    try {
      const getReview = await this.reviewService.getReview(promiseId, reviewId);
      return res.json({
        data: getReview,
        message: `게시글 ${promiseId}에 달린 ${user_id}의 후기 ${reviewId}`,
      });
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId, reviewId } = req.params;
    const { content } = req.body;
    const reviewImageUrl = req.files;
    const image = reviewImageUrl.map((row) => row.location);

    console.log("cont", image);

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
        })
        .validateAsync({ content });

      await this.reviewService.updateReview(content, image, reviewId);
      return res.json({
        msg: "후기가 수정되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    // const user_id = res.locals.userId;
    const { reviewId } = req.params;
    const image = req.file;
    console.log("controller", req.file)

    try {
      const deleteReview = await this.reviewService.deleteReview(reviewId,image);
      return res.json({
        msg: "후기가 삭제되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
