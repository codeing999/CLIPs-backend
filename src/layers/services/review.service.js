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
      return createreviews
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  getReview = async (promiseId, reviewId) => {
    try {
      const getreviews = await this.reviewRepository.getReviewData(promiseId, reviewId);
      // console.log("service", getreviews)
      return getreviews;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  updateReview = async (content, image,reviewId) => {
    try {
      const updatereviews = await this.reviewRepository.updateReviewData(content, image,reviewId);
      return true;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  deleteReview = async (reviewId) => {
    try {
      await this.reviewRepository.deleteReviewData(reviewId);
      return true;
    }catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
