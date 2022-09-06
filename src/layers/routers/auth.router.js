const express = require("express");
const authRouter = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.post("/email", authController.checkEmail);
authRouter.post("/nickname", authController.checkNickname);
//authRouter.get("/token", authController.)

module.exports = authRouter;
