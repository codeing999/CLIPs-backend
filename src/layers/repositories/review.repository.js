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
      for (let i = 0; i < image.length; i++) {
        let bulkImagesUrl = { image: image[i], reviewId: reviewId };
        bulkImages.push(bulkImagesUrl);
      }
      // console.log(bulkImages);

      const createReviewImageData = await ReviewImage.bulkCreate(bulkImages);

      // console.log("repo", createReviewImageData);
      return createReviewData, createReviewImageData;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  getReviewData = async (promiseId, reviewId, content, image) => {
    try {
      const getReviewData = await Review.findAll({
        where: {reviewId},
        attributes :['content'],
        raw:true
      });

      const getReviewImageData = await ReviewImage.findAll({
        where: { reviewId},
        attributes :['image'],
        raw:true
      });
      // console.log("repo의 getReview", getReviewData[0], getReviewImageData);
      const getRepoAll = {getReviewData, getReviewImageData};
      return getRepoAll

    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  updateReviewData = async (content, image, reviewId) => {
    
    //이미지url을 DB에서 삭제
    try {
      const updateREviewImageData = await ReviewImage.destroy({
        where: { reviewId },
      });

      //새로운 후기를 업데이트
      const updateReviewData = await Review.update(
        { content },
        { where: { reviewId } }
      );

      //새로운 이미지 여러 장 올리기 
      let bulkUpateImages = [];
      for (let i = 0; i < image.length; i++) {
        let bulkUpdateImagesUrl = { image: image[i], reviewId: reviewId };
        bulkUpateImages.push(bulkUpdateImagesUrl);
      }
      const createReviewImageData = await ReviewImage.bulkCreate(
        bulkUpateImages
      );
      return updateReviewData, createReviewImageData;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  deleteReviewData = async (reviewId) => {
    
    //후기와 이미지 각각의 DB에서 삭제
    try {
      const deleteReviewImage = await ReviewImage.destroy({ where: { reviewId } });
      const deleteContent = await Review.destroy({ where: { reviewId } });
    return deleteReviewImage, deleteContent;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
