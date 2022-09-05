const ReviewService = require("../services/review.service");
module.exports = class ReviewController {
  reviewService = new ReviewService();

  //메인페이지
  createReview = async (req, res, next) => {
    const { promiseId } = req.params;
    try {
      const getImageUrl = await this.reviewService.createReview();

      return res.json({ data: createReview});
    } catch (err) {
      console.log(err);
      return res.json({
        msg: err.message,
      });
    }
  };
};
