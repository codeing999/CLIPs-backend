const MainService = require("../services/main.service");
module.exports = class MainController {
  mainService = new MainService();

  //메인페이지
  mainPage = async (req, res, next) => {
    const {location, keyword} = req.body; //'강남구 삼성동'

    //주소 x,y 값 받기
    const getAddressUrl = await this.mainService.getAddress(location);
    // return getAddressUrl;

    const getImageUrl = await this.mainService.getImage(keyword);
    const getAllUrl = {getAddressUrl,getImageUrl}
    return getAllUrl
    
  };

//   const getUrl = await this.mainService.getRecommendation();
// return res.send({
//   status: mainPage.status, //x,y, radius 포함
//   list: mainPage.list, //x,y,imageUrl, category, name
// });
};