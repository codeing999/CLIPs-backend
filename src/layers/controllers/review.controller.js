const ReviewService = require("../services/review.service");

module.exports = class ReviewController {
  reviewService = new ReviewService();

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    const { review, image } = req.body;
    const user_id = res.locals.userId;

    try {
      await joi
        .object({
          review: joi.string().required(),
          image: joi.string(),
        })
        .validateAsync({ review, user_id });
      await this.reviewService.createReview(review, image);
      return res.json({
        msg: createReview.msg,
        data: createReview,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId } = req.params;
    const { review, image } = req.body;

    try {
      await this.reviewService.getReview(promiseId);
      return res.json({
        msg: getReview.msg,
        data: getReview,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId } = req.params;
    try {
      await joi
        .object({
          review: joi.string().required(),
          image: joi.string(),
        })
        .validateAsync({ review, user_id });

      await this.reviewService.updateReview(user_id, reviewId);
      return res.json({
        msg: updateReview.msg,
        data: updateReview,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId } = req.params;
    try {
      const result = await this.reviewService.deleteReview(user_id, reviewId);
      return res.json({
        msg: deleteReview.msg,
        data: deleteReview,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

};
