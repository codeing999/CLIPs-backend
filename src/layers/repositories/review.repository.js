const {Promise} = require("../../sequelize/models");
const sequelize = require("sequelize");

module.exports = class ReviewRepository {
  //새로운 리뷰 Promise table에 저장
  createReviewData = async (review, image) => {
    try {
      const createReviewData = await Promise.create({ review, image });
      return createReviewData;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  getReviewData = async (promiseId, user_id) => {
    try {
      const getReviewData = await Promise.findAll({
        order: ["data", "DESC"],
        attributes: { promiseId, user_id },
      });
      return getReviewData;
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  updateReviewData = async (promiseId, user_id) => {
    try {
      const updateReviewData = await Promise.update({
        where: { promiseId: promiseId },
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
  deleteReviewData = async (promiseId, user_id) => {
    try {
      const updateReviewData = await Promise.destroy({
        where: { promiseId: promiseId },
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
