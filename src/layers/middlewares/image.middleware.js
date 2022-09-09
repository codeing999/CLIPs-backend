const multer = require("multer");
const path = require('path');
const fs = require('fs')

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

///uploads 에 이미지 업로드
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir('./uploads/',(err)=>{
      cb(null, './uploads/');
   })},
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, //최대 10mb 까지 업로드 가능, 프론트와 얘기해보기
});
console.log( fileStorageEngine.destination, fileStorageEngine.filename)

const upload = multer({ storage: fileStorageEngine });

module.exports = { upload };
