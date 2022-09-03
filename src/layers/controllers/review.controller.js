const ReviewService = require("../services/review.service")
module.exports = class ReviewController {
  reviewService = new ReviewService();

  //메인페이지
  mainPage = async (req, res, next) => {
    try {
      const { location } = req.body; 
      const getImageUrl = await this.mainService.getImage(location);

      return res.json({ data: getImageUrl });
    } catch (err) {
      console.log(err);
      return res.json({ data : getImageUrl.responseImageData, msg:err.message })
    }
  };
}