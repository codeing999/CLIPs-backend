const express = require("express");
const router = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware')
const RiewController = require("../controllers/review.controller");
const reviewController = new ReviewController();

// 후기페이지
router.post("/", reviewController.createReview);

module.exports = router;