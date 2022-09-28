const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aws = require('aws-sdk');
const multerS3 = require("multer-s3");
const { func } = require("joi");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region:process.env.AWS_REGION,
})

//확장자 필터
fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = "jpg, jpeg, png 파일만 업로드 가능합니다. ";
    cb(null, false);
  }
};

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.REVIEW_BUCKET,
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }, //filename 설정
    limits: { fileSize: 10 * 1024 * 1024 }, //최대 10mb 까지 업로드 가능
  }),
}).array("image", 5);

module.exports = {imageUploader};
