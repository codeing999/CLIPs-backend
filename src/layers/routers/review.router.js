const express = require("express");
const reviewRouter = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware');
const  {imageUploader} = require("../middlewares/image.middleware");

const ReviewController = require("../controllers/review.controller");
const reviewController = new ReviewController();

// 후기페이지
reviewRouter.post("/:promiseId", authMiddlewares, imageUploader, reviewController.createReview);
reviewRouter.get("/:promiseId/:reviewId", authMiddlewares, reviewController.getReview);
reviewRouter.put("/:promiseId/:reviewId", authMiddlewares, reviewController.updateReview);
reviewRouter.delete("/:promiseId/:reviewId",authMiddlewares, reviewController.deleteReview);

module.exports = reviewRouter;