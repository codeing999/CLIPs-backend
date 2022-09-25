const express = require("express");
const mainRouter = express.Router();
const MainController = require("../controllers/main.controller");
const mainController = new MainController();

// 메인페이지
mainRouter.post("/", mainController.mainPage);
mainRouter.post("/crawlAll", mainController.crawlingData);


//크롤링 따로 할 때 
// mainRouter.post("/crawl", mainController.imageUrl);
// mainRouter.post("/crawlTime", mainController.timeUrl)

module.exports = mainRouter;