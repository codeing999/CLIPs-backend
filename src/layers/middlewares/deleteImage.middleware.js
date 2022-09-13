const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { ReviewImage } = require("../../sequelize/models");

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
  try {
    const { reviewId } = req.params;
    const { image } = await ReviewImage.findOne({
      where: { reviewId },
      attributes: ["image"],
      raw: true,
    });
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
    next();
  } catch (err) {
    console.log;
    return { message: err.message };
  }
};

module.exports = { deleteImage };
