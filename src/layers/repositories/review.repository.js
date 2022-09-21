const { Review, ReviewImage, Promise } = require("../../sequelize/models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = class ReviewRepository {
  //새로운 리뷰를 Review와 ReviewImage table에 저장
  createReviewData = async (content, image, promiseId, userId) => {
    try {
      const createReviewData = await Review.create({
        content,
        promiseId,
        userId,
      });
      let reviewId = createReviewData.dataValues.reviewId;

      let bulkImages = [];
      for (let i = 0; i < image.length; i++) {
        let bulkImagesUrl = { image: image[i], reviewId: reviewId };
        bulkImages.push(bulkImagesUrl);
      }
      const createReviewImageData = await ReviewImage.bulkCreate(bulkImages);

      // await Promise.update({done}, where:{}) //reviewId가 생성되면 그 promiseId를 갖고 promse table의 done을 바꿔주기

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
        raw: true, //include를 쓰면  'Reviews.reviewId': 4 날라옴
        include: {
          model: Review,
          where:{userId},
          attributes: ['reviewId','content']
        },    
      });
// console.log(promiseData[0]['Reviews.reviewId'])

      //가져온 promiseId로 Review/ReviewImage 테이블에서 content, image 링크 가져오기
      // for (let i = 0; i < promiseData.length; i++) {
      //   const review = await Review.findAll({
      //     where: {
      //       userId: promiseData[i].userId,
      //       // promiseId: promiseData[i].promiseId,
      //       // promiseId: { [Op.not]: null },
      //     },
      //     attributes: ["reviewId", "content"],
      //     raw: true,
      //   });
      //   reviews.push(review);
      // }
      // const reviewData = reviews[0];
      // console.log(reviewData[0].reviewId, reviewData[1].reviewId) //4,5

      for (let j = 0; j < reviews.length; j++) {
        const reviewImage = await ReviewImage.findAll({
          where: {
            reviewId: reviewData[j].reviewId,
          },
          attributes: ["reviewId", "image"],
          raw: true,
        });
        images.push(reviewImage);
      }
      const reviewImageData = images;

      return { promiseData, reviewData, reviewImageData };
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
