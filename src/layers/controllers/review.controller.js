const joi = require("joi");
const Validation = require("../../modules/joi_storage");
const ReviewService = require("../services/review.service");

module.exports = class ReviewController {
  reviewService = new ReviewService();
  validation = new Validation();

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    const { content, image } = req.body;
    const user_id = res.locals.userId;

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
          image: this.validation.getImageJoi(),
        })
        .validateAsync({ content, image });

      const getReview = await this.reviewService.createReview(
        content,
        image,
        promiseId
      );
      return res.json({
        msg: getReview.message,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const { promiseId , reviewId} = req.params;

    try {
      const getReview = await this.reviewService.getReview( promiseId , reviewId);
      return res.json({
        data: getReview
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId, reviewId } = req.params;
    const { content, image } = req.body;
    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
          image: this.validation.getImageJoi(),
        })
        .validateAsync({ content, image });

      await this.reviewService.updateReview(content, image, reviewId);
      return res.json({
        msg: "후기가 수정되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId, reviewId } = req.params;

    try {
      const deleteReview = await this.reviewService.deleteReview(reviewId);
      return res.json({
        msg: "후기가 삭제되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
