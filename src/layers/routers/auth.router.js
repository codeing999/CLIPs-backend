const express = require("express");
const authRouter = express.Router();

const AuthController = require("../controllers/auth.controller");
const authController = new AuthController();

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);

module.exports = authRouter;
