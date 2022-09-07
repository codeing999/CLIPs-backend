const ReviewRepository = require("../repositories/review.repository");
const authmiddleware = require("../middlewares/auth.middleware");

module.exports = class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (review, image, promiseId, user_id) => {
    try {
      const createreviews = await this.reviewRepository.createReviewData(
        review,
        image,
        user_id
      );
      return res.json({ msg: "후기가 등록되었습니다.", data: createreviews });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  getReview = async (promiseId, user_id) => {
    try {
      const getreviews = await this.reviewRepository.getReviewData();
      return getreviews;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  updateReview = async (review, image, promiseId, user_id) => {
    try {
      const updatereviews = await this.reviewRepository.updateReviewData();
      return updatereviews;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  deleteReview = async () => {
    try {
      const deletereviews = await this.reviewRepository.deleteReviewData();
      return deletereviews;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
