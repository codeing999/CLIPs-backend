const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const promiseRouter = require("./promise.router");

router.use("/auth", authRouter);
router.use("/promise", promiseRouter);

module.exports = router;
