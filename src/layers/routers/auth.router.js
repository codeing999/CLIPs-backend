const express = require("express");
const authRouter = express.Router();

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

module.exports = authRouter;
