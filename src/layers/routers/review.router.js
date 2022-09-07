const express = require("express");
const reviewRouter = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware')

const ReviewController = require("../controllers/review.controller");
const reviewController = new ReviewController();

// 후기페이지
reviewRouter.post("/:promiseId", authMiddlewares, reviewController.createReview);
reviewRouter.get("/:promiseId/:reviewId", authMiddlewares, reviewController.getReview);
reviewRouter.put("/:promiseId/:reviewId", authMiddlewares, reviewController.updateReview);
reviewRouter.delete("/:promiseId/:reviewId",authMiddlewares, reviewController.deleteReview);

module.exports = reviewRouter;