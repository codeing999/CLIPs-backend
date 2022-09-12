const joi = require("joi");
const Validation = require("../../modules/joi_storage");
const ReviewService = require("../services/review.service");

module.exports = class ReviewController {
  reviewService = new ReviewService();
  validation = new Validation();

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    const { content } = req.body;
    const reviewImageUrl = req.files; //[{하나},{하나}] 
    const image = reviewImageUrl.map(row=> row.location) // ['주소', '주소'] 

    // let image = '';
    // for (let i= 0; i< reviewImageUrl.length; i++) {
    //   if (i === reviewImageUrl.length) {image += images[i]}
    //     else{image += images[i] + ","
    //     }
    // }
    console.log(image)

    const user_id = res.locals.userId; 

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
        })
        .validateAsync({ content });

      const getReview = await this.reviewService.createReview(
        content,
        image,
        promiseId
      );
      return res.json({
        msg: getReview.message,
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const { promiseId , reviewId} = req.params;

    try {
      const getReview = await this.reviewService.getReview( promiseId , reviewId);
      return res.json({
        data: getReview
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId, reviewId } = req.params;
    const { content } = req.body;
    const reviewImageUrl = req.files;
    const image = reviewImageUrl.map(row=> row.location)

    console.log("cont", image)

    try {
      await joi
        .object({
          content: this.validation.getContentJoi(),
        })
        .validateAsync({ content });

      await this.reviewService.updateReview(content, image, reviewId);
      return res.json({
        msg: "후기가 수정되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    const user_id = res.locals.userId;
    const { promiseId, reviewId } = req.params;

    try {
      const deleteReview = await this.reviewService.deleteReview(reviewId);
      return res.json({
        msg: "후기가 삭제되었습니다",
      });
    } catch (err) {
      console.log(err);
      return { msg: err.message };
    }
  };
};
