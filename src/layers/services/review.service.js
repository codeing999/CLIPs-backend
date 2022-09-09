const ReviewRepository = require("../repositories/review.repository");
const authmiddleware = require("../middlewares/auth.middleware");

module.exports = class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async ( content, image, promiseId ) => {
    try {
      const createreviews = await this.reviewRepository.createReviewData(
        content,
        image,
        promiseId
      );
      return {
        status: 200,
        message: "후기가 생성되었습니다.",
        data: createreviews
      }
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  getReview = async ( promiseId , reviewId) => {
    try {
      const getreviews = await this.reviewRepository.getReviewData( promiseId , reviewId);
      return getreviews;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  updateReview = async (content, image,reviewId) => {
    try {
      const updatereviews = await this.reviewRepository.updateReviewData(content, image,reviewId);
      return true;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  deleteReview = async (reviewId) => {
    try {
      await this.reviewRepository.deleteReviewData(reviewId);
      return true;
    }catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
