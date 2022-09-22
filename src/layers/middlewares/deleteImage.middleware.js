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

//확장자 필터
fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true); // 위의 jpg, jpeg, png 만 받겠다
  } else {
    req.fileValidationError = "jpg, jpeg, png 파일만 업로드 가능합니다. ";
    cb(null, false);
  }
};

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
  } else {
    const { image } = await ReviewImage.findOne({
      where: { reviewId: reviewData.reviewId },
      raw: true,
      attributes: ["image"],
    });

    try {
      if (!reviewData) {
        return res.status(400).json({ message: "삭제할 이미지가 없습니다." });
      } else if (!image) {
        const params = {
          Bucket: "clips-s3-bucket",
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
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "후기 삭제 실패" });
    }
  }
  next();
};
module.exports = { deleteImage };
