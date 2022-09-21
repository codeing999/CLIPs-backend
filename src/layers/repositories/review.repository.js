const { Review, ReviewImage, Promise } = require("../../sequelize/models");
const sequelize = require("sequelize");
const { Op } = require('sequelize');

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
      // console.log(bulkImages)
      const createReviewImageData = await ReviewImage.bulkCreate(bulkImages);
      // console.log("repo", createReviewData,createReviewImageData );
      return createReviewData, createReviewImageData;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //userId로 Promise 테이블에서 promise_id랑 date, x,y 가져오기
  //promise_id로 Review/ReviewImage 테이블에서 content/image 가져오기
  getReviewData = async (userId) => {
    const promiseData = [];
    let reviews = [];
    let images = [];

    try {
      //Promise 테이블에서 내가 쓴 약속 찾아서 date, x, y 값 가져오기
      const promiseData = await Promise.findAll({
        where: { userId },
        attributes: ["date", "x", "y", "promiseId", "userId"],
        raw: true,
      });

      //가져온 promiseId로 Review/ReviewImage 테이블에서 content, image 링크 가져오기
      for (let i = 0; i < promiseData.length; i++) { 
        const review = await Review.findAll({
          where: {  userId:userId} ,
          //   promiseId : promiseData[i].promiseId,
          // promiseId: {[Op.not]: null} },
          attributes: ["reviewId", "content"],
          raw: true,
          include : [{
            model:ReviewImage,
            required: false,
            attributes:['image']
          }]
        }) 
        reviews.push(review)
      }
      const reviewData = reviews[0]
      return {promiseData, reviewData};

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
      const deleteReviewImage = await ReviewImage.destroy({
        where: { reviewId },
      });
      const deleteContent = await Review.destroy({ where: { reviewId } });
      return deleteReviewImage, deleteContent;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
