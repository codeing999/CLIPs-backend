const { Review, ReviewImage } = require("../../sequelize/models");
const sequelize = require("sequelize");

module.exports = class ReviewRepository {
  //새로운 리뷰를 Review와 ReviewImage table에 저장
  createReviewData = async (content, image, promiseId) => {
    try {
        const createReviewData = await Review.create({
        content,
        promiseId,
      });
      let reviewId = createReviewData.dataValues.reviewId;

      let bulkImages = [];
      for (let i=0; i< image.length; i++ ) {
        let bulkImagesUrl = {image: image[i], reviewId : reviewId};
        bulkImages.push(bulkImagesUrl)}
        console.log(bulkImages)

      const createReviewImageData = await ReviewImage.bulkCreate(bulkImages);

      console.log("repo", createReviewImageData)
      return createReviewData, createReviewImageData;}

    catch (err) {
      console.log(err);
      return { message: err.message }}}

  getReviewData = async (promiseId, reviewId) => {
    try {
      const getReviewData = await Review.findAll({
        where: { reviewId: reviewId, promiseId: promiseId },
      });
      return getReviewData;
    } catch (err) {
      console.log(err);
      return { message: err.message };
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
      return { message: err.message };
    }
  };
  deleteReviewData = async (reviewId) => {
    await Review.destroy({
      where: { review_id: reviewId },
    });
  }
}