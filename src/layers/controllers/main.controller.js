const MainService = require("../services/main.service");
const SeperateCrawlingService = require('../services/seperatecrawling.service')

module.exports = class MainController {
  mainService = new MainService();

  //메인페이지
  mainPage = async (req, res, next) => {
    try {
      const { location } = req.body;
      const getImageUrl = await this.mainService.getList(location);
      return res.json({ data: getImageUrl });
    } 
    catch (err) {
      console.log(err);
      return res.json({ msg: err.message });
    }
  };

  crawlingData = async(req,res,next) => {
    try{
      const {placeUrl} = req.body;
      const arrCrawlTimeList = await this.mainService.crawlData(placeUrl);
      return res.json({data: arrCrawlTimeList});

    } catch(err){
      console.log(err);
      return res.json({msg:err.message});
    }
  }
};

// module.exports = class MainController {
//   seperateCrawlingService = new SeperateCrawlingService();

//   imageUrl = async(req,res,next) => {
//     try{
//       const {placeUrl} = req.body;
//       const crawlingList = await this.seperateCrawlingService.crawlImage(placeUrl);
//       return res.json({data: crawlingList});
//     } catch(err){
//       console.log(err);
//       return res.json({msg:err.message});
//     }
//   }

//   timeUrl = async(req, res, next) => {
//     try{
//       const {placeUrl} = req.body;
//       const crawlingList = await this.seperateCrawlingService.crawlTimeData(placeUrl);
//       return res.json({data: crawlingList});
//     } catch(err){
//       console.log(err);
//       return res.json({msg:err.message}); 
//     }
//   }
// }