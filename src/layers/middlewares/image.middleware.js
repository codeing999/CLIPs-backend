const multer = require("multer");
const path = require("path");
const fs = require("fs");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { func } = require("joi");
const { error } = require("console");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: process.env.AWS_REGION,
});

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.REVIEW_BUCKET,
    acl: "public-read-write",
    key: function (req, file, cb) { //The name of the file
        if (
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/png" ||
          file.mimetype === "image/heic"
        ) {
          cb(null, `${Date.now()}-${file.originalname}`);
        } else {
          return cb(req.fileValidationError = "jpg, jpeg, png, heic 파일만 업로드 가능합니다. ")
        }
    },
}),
    limits: { fileSize: 10 * 1024 * 1024 }, //최대 10mb 까지 업로드 가능
}).array("image", 5);

const profileImageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.PROFILE_BUCKET,
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }, //filename 설정
    limits: { fileSize: 10 * 1024 * 1024 }, //최대 10mb 까지 업로드 가능
  }),
}).single("image");
module.exports = { imageUploader, profileImageUploader };
