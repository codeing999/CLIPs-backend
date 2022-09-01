const MainService = require("../services/main.service");
module.exports = class MainController {
  mainService = new MainService();

  //메인페이지
  mainPage = async (req, res, next) => {
    try {
      const { location } = req.body; // 프론트로부터 구까지 받을 예정
      const getImageUrl = await this.mainService.getImage(location);
      return res
      .json({data:getImageUrl, msg: getImageUrl.message });
    } catch (err) {
      console.log(err);
      return { status: 400, msg: err.message };
    }
  };
};
