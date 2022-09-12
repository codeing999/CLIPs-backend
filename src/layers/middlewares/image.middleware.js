const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const { S3Client } = require("@aws-sdk/client-s3");
const aws = require('aws-sdk');
// const awsConfig = require('../../sequelize/config/config.json')
// aws.config.loadFromPath(__dirname + '/config/config.json');
const multerS3 = require("multer-s3");
const { func } = require("joi");
const { fstat } = require("fs");
// const { extensions } = require("sequelize/types/utils/validator-extras");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region:process.env.AWS_REGION,
  // endpoint: "https://s3.amazonaws.com" //UnknownEndpoint: Inaccessible host 에러라서 추가함
})

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

// uploads 에 이미지 업로드
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     fs.mkdir('./uploads/',(err)=>{
//       cb(null, './uploads/');
//    })},
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 1024 * 1024 }, //최대 10mb 까지 업로드 가능
// });
// const upload = multer({ storage: fileStorageEngine });

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "clips-s3-bucket",
    acl: "public-read-write",
    key: function (req, file, cb) { 
      cb(null, `${Date.now()}-${file.originalname}`);
    }, //filename 설정
    limits: { fileSize: 10 * 1024 * 1024 },//최대 10mb 까지 업로드 가능
  }),
}).array("image", 5)

// module.exports = {upload};
module.exports = {imageUploader};
