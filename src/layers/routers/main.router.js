const express = require("express");
const router = express.Router();
const MainController = require("../controllers/main.controller");
const mainController = new MainController();

// 메인페이지
// router.post("/main", mainController.mainPage);
router.get("/", mainController.mainPage);
router.get("/crawl", mainController.imageUrl);

module.exports = router;