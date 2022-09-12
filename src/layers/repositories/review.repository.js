const { Review } = require("../../sequelize/models");
const { ReviewImage } = require("../../sequelize/models");
const sequelize = require("sequelize");

module.exports = class ReviewRepository {
  //새로운 리뷰를 Review와 ReviewImage table에 저장
  createReviewData = async (content, image, promiseId) => {
    try {
      const createReviewData = await Review.create({
        content,
        promiseId
      }); 
      let reviewId = createReviewData.dataValues.reviewId
 
      const createReviewImageData = await ReviewImage.bulkCreate([{image:reviewId}])
      console.log("repo22", createReviewData)
      return createReviewData, createReviewImageData
    } catch (err) {
        console.log(err);
        return { msg: err.message };
      }
    }
   
  getReviewData = async (promiseId, reviewId) => {
    try {
      const getReviewData = await Review.findAll({
        where: { review_id: reviewId, promise_id: promiseId },
      });
      return getReviewData;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  updateReviewData = async (content, image, reviewId) => {
    try {
      const updateReviewData = await Review.update(
        { content, image },
        { where: { reviewId } }
      );
      return updateReviewData;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
  deleteReviewData = async (reviewId) => {
    await Review.destroy({
      where: { review_id: reviewId },
    });
  };
};