const express = require("express");
const authRouter = express.Router();

const passport = require("passport");

const authMiddlewares = require("../middlewares/auth.middleware");
const needRefresh = require("../middlewares/refresh.middleware");
const inNotSignedIn = require("../middlewares/isNotSignedIn.middleware");
const inSignedIn = require("../middlewares/isSignedIn.middleware");
const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

authRouter.post("/signup", inNotSignedIn, authController.signUp);
authRouter.post("/email", authController.checkEmail);
authRouter.post("/nickname", authController.checkNickname);
authRouter.post("/signin", inNotSignedIn, authController.signIn);
authRouter.post("/token", needRefresh, authController.reIssue);
authRouter.delete("/signout", needRefresh, authController.signOut);
authRouter.get("/mypage", authMiddlewares, authController.getMyPage);
authRouter.patch("/mypage", authMiddlewares, authController.updateMyPage);
authRouter.get("/kakao", passport.authenticate("kakao")); //카카오 로그인 페이지로 가는 요청
authRouter.get(
  //로그인하면 성공 여부를 받는 경로
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/", //kakaoStrategy에서 실패한다면 실행
  }),
  //kakaoStrategy에서 성공한다면 콜백 실행
  (req, res) => {
    res.redirect("/api/auth/mypage");
  }
);
module.exports = authRouter;
