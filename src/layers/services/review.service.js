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
        let withImage = null;
        if (getreviews.reviewImageData[idx]) {
          withImage = getreviews.reviewImageData[idx].image;
        }

        return {
          reviewId: getreviews.reviews[idx].reviewId,
          image: withImage,
          content: getreviews.reviews[idx].content,
          promise: {
            promiseUserId: post.promiseId,
            date: post.date,
            location: post.location          
          },
        };
      });

      let extendedFriendData = [];
      getreviews.extendedFriend.forEach((p, i) => {
        // console.log(getreviews.extendedReviews)

        if (p.length !== 0 || getreviews.extendedReviews[i] !== 0) {
          let tmp = {};
          tmp.reviewId = getreviews.extendedReviews[i].reviewId;
          tmp.image = getreviews.extendedReviews[i]["ReviewImages.image"];
          tmp.content = getreviews.extendedReviews[i].content;

          tmp.promiseUserId = p.userId;
          tmp.date = p.date;
          tmp.location = p.location;

          tmp.FriendPromiseId = p['participants.Friend.promiseId'];
          tmp.FriendId = p['participants.Friend.userId'];
          extendedFriendData.push(tmp);
        }
      });
    
      console.log(extendedFriendData)

      promiseandReviews.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      extendedFriendData.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });

      if (promiseandReviews, extendedFriendData) {
        return {promiseandReviews, extendedFriendData};
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
