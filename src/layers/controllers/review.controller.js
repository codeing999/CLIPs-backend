const joi = require("joi");
const Validation = require("../../modules/joiStorage");
const { use } = require("../routers/review.router");
const ReviewService = require("../services/review.service");

module.exports = class ReviewController {
  reviewService = new ReviewService();
  validation = new Validation();

  //리뷰 작성
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    const { content } = req.body;
    const reviewImageUrl = req.files; //[{하나},{하나}]
    const image = reviewImageUrl.map((row) => row.location); // ['주소', '주소']
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
        // data: getReview,
        message: `후기가 등록되었습니다.  내용: ${content}, 링크 : ${image}`
      });
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 조회
  getReview = async (req, res, next) => {
    const userId = res.locals.userId;
    console.log("userid", userId)
    try {
      const getReview = await this.reviewService.getReview(userId);
      return res.json (getReview);
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 수정
  updateReview = async (req, res, next) => {
    try {
      const { promiseId, reviewId } = req.params;
      const { content } = req.body;
      const reviewImageUrl = req.files;
      const image = reviewImageUrl.map((row) => row.location);
      if (reviewImageUrl) {
        // console.log("cont", content);

        // await joi
        //   .object({
        //     content: this.validation.getContentJoi(),
        //   })
        //   .validateAsync({ content });

        // await this.reviewService.updateReview({content, image},{where :{reviewId}});
        await this.reviewService.updateReview(content, image, reviewId);
        return res.json({
          msg: "후기가 수정되었습니다",
        });
      } else {
        console.log("삭제할 이미지가 없습니다. ");
      }
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };

  //리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      // const image = req.file;
      // if (image) {
        const deleteReview = await this.reviewService.deleteReview(
          reviewId
        );
        return res.json({
          msg: "후기가 삭제되었습니다",
        });
      // } else {
      //   console.log("삭제할 이미지가 없습니다. ");
      // }
    } catch (err) {
      console.log(err);
      return { message: err.message };
    }
  };
};
