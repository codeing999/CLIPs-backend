const ReviewRepository = require("../repositories/review.repository");
const authmiddleware = require("../middlewares/auth.middleware");

module.exports = class ReviewService {
  reviewRepository = new ReviewRepository();

  createReview = async (content, image, promiseId, userId) => {
    try {
      const createreviews = await this.reviewRepository.createReviewData(
        content,
        image,
        promiseId,
        userId
      );
      return createreviews;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  getReview = async (userId) => {
    try {
      const getreviews = await this.reviewRepository.getReviewData(userId);

      const promiseandReviews = getreviews.promiseData.map((post, idx) => {
        console.log(getreviews.promiseData)
        
        let withImage = null;
        if (getreviews.reviewImageData[idx]) {
          withImage = getreviews.reviewImageData[idx].image;
        }

        return {
          reviewId: getreviews.reviews[idx].reviewId,
          image: withImage,
          content: getreviews.reviews[idx].content,
          promiseUserId: post.promiseId,
          date: post.date,
          location: post.location,
  
        };
      });

      //게시글 내림 차순으로 정렬
      promiseandReviews.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      if (promiseandReviews) {
        return { promiseandReviews };
      } else return { success: false };

      // return getreviews;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  updateReview = async (content, image, reviewId, userId) => {
    try {
      await this.reviewRepository.updateReviewData(
        content,
        image,
        reviewId,
        userId
      );
      return true;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  deleteReview = async (reviewId, userId) => {
    try {
      await this.reviewRepository.deleteReviewData(reviewId, userId);
      return true;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
