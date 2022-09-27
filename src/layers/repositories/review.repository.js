const {
  Review,
  ReviewImage,
  Promise,
  User,
  Friend,
} = require("../../sequelize/models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const _ = require("lodash")

module.exports = class ReviewRepository {
  //새로운 리뷰를 Review와 ReviewImage table에 저장
  //약속 작성자만 후기 작성 가능
  createReviewData = async (content, image, promiseId, userId) => {
    try {
      const writer = await Promise.findAll({
        where: { promiseId },
        raw: true,
        attributes: ["userId"],
      });

      if (Number(writer[0].userId) !== Number(userId)) {
        return ({message: "약속 생성자만 작성할 수 있습니다. "});
      } else {
        const createReviewData = await Review.create({
          content,
          promiseId,
          userId,
        });

        let bulkImages = [];
        for (let i = 0; i < image.length; i++) {
          let bulkImagesUrl = {
            image: image[i],
            reviewId: createReviewData.dataValues.reviewId,
          };
          bulkImages.push(bulkImagesUrl);
        }
        await ReviewImage.bulkCreate(bulkImages);

        //reviewId가 생성되면 그 promiseId를 갖고 promse table의 done을 바꿔주기
        const promiseIdfromReview = await Review.findAll(
          { where: { reviewId: createReviewData.dataValues.reviewId } },
          { attributes: ["promiseId"] }
        );
        for (let k = 0; k < promiseIdfromReview.length; k++) {
          await Promise.update(
            { done: "true" },
            {
              where: { promiseId: promiseIdfromReview[k].dataValues.promiseId },
            }
          );
        }
        return;
      }
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //userId로 Promise 테이블에서 promise_id랑 date, x,y 가져오기
  //promise_id로 Review/ReviewImage 테이블에서 content/image 가져오기
  //friend 테이블에 있는 사람들도 볼 수 있게 하기 (?)
  getReviewData = async (userId) => {
    let extendedReviews = [];

    try {
      //Promise 테이블에서 내가 쓴 약속 찾아서 값 가져오기
      const promiseDataReview = await Promise.findAll({
        where: { userId },
        attributes: ["date", "location", "promiseId", "userId"],
        raw: true,
        include: {
          model: Review,
          attributes: ["content", "reviewId"],
        },
      });

      for (let i = 0; i < promiseDataReview.length; i++) {
        const images = await ReviewImage.findAll({
          where: {
            reviewId: promiseDataReview[i]["Reviews.reviewId"],
          },
          attributes: ["image"],
          raw: true,
        });
        promiseDataReview[i].image = _.map(images, "image");
      }

      const extendedFriend = await Promise.findAll({
        attributes: ["date", "location", "promiseId", "userId"],
        include: [
          {
            model: User,
            through: "Friend",
            as: "participants",
            where: { userId },
            attributes: ["name"],
          },
        ],
        raw: true,
      });

      for (let j = 0; j < extendedFriend.length; j++) {
        const extendedReview = await Review.findAll({
          where: { promiseId: extendedFriend[j].promiseId },
          attributes: ["content", "reviewId"],
          order: [["updatedAt", "DESC"]],
          include: [
            {
              model: ReviewImage,
              attributes: ['image'],
            },
          ],
          raw: true,
        }); 
        extendedFriend[j].image = _.map(extendedReview, 'ReviewImages.image');
        extendedFriend[j]['Reviews.content'] = extendedReview[0]?.content
      }
      return [...promiseDataReview, ...extendedFriend];

    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  updateReviewData = async (content, image, reviewId, userId) => {
    //이미지url을 DB에서 삭제
    const updateUser = await Review.findAll(
      { where: { reviewId } },
      { attributes: ["userId"] }
    );

    if (updateUser[0].dataValues.userId === userId) {
      try {
        // const updateREviewImageData =
        await ReviewImage.destroy({
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
    }
  };

  deleteReviewData = async (reviewId, userId) => {
    //후기와 이미지 각각의 DB에서 삭제
    try {
      const promiseFalse = await Review.findAll({
        where: { reviewId: reviewId },
        attributes: ["promiseId"],
      });

      for (let q = 0; q < promiseFalse.length; q++) {
        await Promise.update(
          { done: "false" },
          { where: { promiseId: promiseFalse[q].dataValues.promiseId } }
        );
      }

      await Review.destroy({ where: { reviewId } });
      await ReviewImage.destroy({
        where: { reviewId },
      });

      return;
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
