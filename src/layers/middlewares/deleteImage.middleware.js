const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { ReviewImage, Review } = require("../../sequelize/models");
// const { createHistogram } = require("perf_hooks");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.AWS_REGION,
});


const deleteImage = async (req, res, next) => {
  const { reviewId } = req.params;
  const userId = res.locals.userId;

  const reviewData = await Review.findOne({
    where: { reviewId, userId },
    raw: true,
    attributes: ["reviewId"],
  });

  if (!reviewData) {
    return res.json({ message: "작성자만 수정/삭제가 가능합니다. " });
  }
  try {
    const { image } = await ReviewImage.findOne({
      where: { reviewId: reviewData.reviewId },
      raw: true,
      attributes: ["image"],
    });
    const params = {
      Bucket: process.env.REVIEW_BUCKET,
      Key: image.split("/")[3],
    };

    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log("이미지가 삭제되었습니다.", data);
        return image;
      }
    });
  } catch (err) {
    console.log(err);
  }
  next();
};
module.exports = { deleteImage };
