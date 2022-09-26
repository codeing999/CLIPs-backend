const ReviewRepository = require("../repositories/review.repository");
const authmiddleware = require("../middlewares/auth.middleware");
const _ = require("lodash")

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
      // const getReviewsData = _.map(getreviews, 'ReviewImages.image')
      // console.log(getreviews)
      
      const promiseAndReviews = getreviews.map((post) => {
        console.log("1",post)
 
        return {
          reviewId: post['Reviews.reviewId'],
          image: post.image,
          content: post['Reviews.content'],
          promiseUserId: post.promiseId,
          location: post.location,
          date: post.date
        };
      });

      console.log("2", promiseAndReviews)

      // let extendedFriendData = [];
      // getreviews.extendedFriend.forEach((p, i) => {
      //   if (p.length !== 0 && getreviews.extendedReviews[i].length !== 0) {
      //     let tmp = {};
      //     tmp.reviewId = getreviews.extendedReviews[i][0].reviewId;
      //     tmp.image = getreviews.extendedReviews[i][0]["ReviewImages.image"];
      //     tmp.content = getreviews.extendedReviews[i][0].content;

      //     tmp.promiseUserId = p.userId;
      //     tmp.date = p.date;
      //     tmp.location = p.location;

      //     tmp.FriendPromiseId = p['participants.Friend.promiseId'];
      //     tmp.FriendId = p['participants.Friend.userId'];
      //     extendedFriendData.push(tmp);
      //   }
      // });
    
      // promiseandReviews.sort((a, b) => {
      //   return b.createdAt - a.createdAt;
      // });

      if (promiseAndReviews) {
        return promiseAndReviews
      } else return { success: false };

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
