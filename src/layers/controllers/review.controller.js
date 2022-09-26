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
    const reviewImageUrl = req.files; 
    const image = reviewImageUrl.map((row) => row.location);
    const {userId} = res.locals;

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
        })
        .validateAsync({ content });

      const getReview = await this.reviewService.createReview(
        content,
        image,
        promiseId,
        userId
      );
      return res.json({message: "후기가 생성되었습니다. "});
    } catch (err) {
      console.log(err);
      return { message: "작성자만 후기 작성 가능합니다." };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      const getReview = await this.reviewService.getReview(userId);
      return res.json(getReview);
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 수정, 작성자만 수정 가능
  updateReview = async (req, res, next) => {

      const { promiseId, reviewId } = req.params;
      const { content } = req.body;
      const reviewImageUrl = req.files;
      const userId = res.locals.userId
      const image = reviewImageUrl.map((row) => row.location);
      try {
      if (reviewImageUrl || userId) {
        await this.reviewService.updateReview(content, image, reviewId, userId);
        return res.json({
          message: "후기가 수정되었습니다",
        });
      } else {
        return {message:"삭제할 이미지가 없습니다. " }
      }
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 삭제, 작성자만 삭제 가능
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const userId = res.locals.userId;

      await this.reviewService.deleteReview(
          reviewId, userId
        );
        return res.json({
          message: "후기가 삭제되었습니다",
        });

    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
