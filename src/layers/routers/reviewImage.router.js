const {upload} = require("../middlewares/image.middleware");
const express = require("express");
const reviewImageRouter = express.Router();

reviewImageRouter.get("/", (req,res) =>{res.render("upload")})

//여러 이미지 images 폴더에 올리기
reviewImageRouter.post("/upload", upload.array("images", 5), async(req, res)=> {
    console.log(req.files);
    return res.json(req.files[0].path)
});

//사진 한 장 올리기
reviewImageRouter.post("/upload", upload.single("image"), (req, res)=> {
    console.log(req.file);
    res.send("이미지가 올라갔습니다.")
});

// reviewImageRouter.put("/", (req, res) => {
//     res.render("upload")
// });
module.exports = reviewImageRouter;