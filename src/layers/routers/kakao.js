const express = require("express");
const router = express.Router();

const passport = require("passport");

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

router.get("/auth/kakao", passport.authenticate("kakao")); //카카오 로그인 페이지로 가는 요청
router.get(
  //로그인하면 성공 여부를 받는 경로
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "https://clipspromise.com", //kakaoStrategy에서 실패한다면 실행
  }),
  //kakaoStrategy에서 성공한다면 콜백 실행
  authController.kakaoLogin
);

module.exports = router;
