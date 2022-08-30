const MainService = require("../services/main.service");
module.exports = class MainController{
    mainService = new MainService();
}

//메인페이지
mainPage = async(req, res, next) => {
    const {
        city, 
        middle, 
        location,
    } = req.body;
}

return res.send({
    status: mainPage.status, //x,y, radius 포함
    list :mainPage.list, //x,y,imageUrl, category, name
})