const express = require("express");
const authRouter = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);

module.exports = authRouter;
