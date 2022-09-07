const express = require("express");
const router = express.Router();

const mainRouter = require("./main.router");
const authRouter = require("./auth.router");
const promiseRouter = require("./promise.router");

router.use("/auth", authRouter);
router.use("/promise", promiseRouter);
router.use("/main", mainRouter);

module.exports = router;
