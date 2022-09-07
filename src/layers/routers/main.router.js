const express = require("express");
const mainRouter = express.Router();
const MainController = require("../controllers/main.controller");
const mainController = new MainController();

// 메인페이지
mainRouter.get("/", mainController.mainPage);
mainRouter.get("/crawl", mainController.imageUrl);

module.exports = mainRouter;