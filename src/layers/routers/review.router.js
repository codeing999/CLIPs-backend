const express = require("express");
const reviewRouter = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware')

const ReviewController = require("../controllers/review.controller");
const reviewController = new ReviewController();

// 후기페이지
// reviewRouter.post("/", authMiddlewares, reviewController.createReview);
// reviewRouter.get("/:promiseId", authMiddlewares, reviewController.getReview);
// reviewRouter.put("/:promiseId", authMiddlewares, reviewController.updateReview);
// reviewRouter.delete("/:promiseId",authMiddlewares, reviewController.deleteReview);

reviewRouter.post("/", reviewController.createReview);
reviewRouter.get("/:promiseId", reviewController.getReview);
reviewRouter.put("/:promiseId", reviewController.updateReview);
reviewRouter.delete("/:promiseId", reviewController.deleteReview);

module.exports = reviewRouter;