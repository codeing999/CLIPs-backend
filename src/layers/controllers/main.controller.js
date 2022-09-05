const MainService = require("../services/main.service");
module.exports = class MainController {
  mainService = new MainService();

  //메인페이지
  mainPage = async (req, res, next) => {
    try {
      const { location } = req.body;
      const getImageUrl = await this.mainService.getImage(location);

      return res.json({ data: getImageUrl });
    } catch (err) {
      console.log(err);
      return res.json({ msg: err.message });
    }
  };

  imageUrl = async(req,res,next) => {
    try{
      const {placeUrl} = req.body;
      const crawlingList = await this.mainService.crawlImage(placeUrl);
      return res.json({data: crawlingList});
    } catch(err){
      console.log(err);
      return res.json({msg:err.message});
    }
  }
};
