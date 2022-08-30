const express = require("express");
const router = express.Router();
const MainController = require("../controllers/main.controller");
const mainController = new AuthController();

// 메인페이지
router.post("/main", mainController.mainPage);

module.exports = router;