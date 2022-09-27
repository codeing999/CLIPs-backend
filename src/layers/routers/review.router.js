const express = require("express");
const reviewRouter = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware');
const  {imageUploader} = require("../middlewares/image.middleware");
const  {deleteImage}= require("../middlewares/deleteImage.middleware");

const ReviewController = require("../controllers/review.controller");
const reviewController = new ReviewController();

// 후기페이지
reviewRouter.post("/:promiseId", authMiddlewares, imageUploader, reviewController.createReview);
reviewRouter.get("/", authMiddlewares, reviewController.getReview);
reviewRouter.put("/:reviewId", authMiddlewares, deleteImage, imageUploader, reviewController.updateReview);
reviewRouter.delete("/:reviewId",authMiddlewares, deleteImage, reviewController.deleteReview);

module.exports = reviewRouter;