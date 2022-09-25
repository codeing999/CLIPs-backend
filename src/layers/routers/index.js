const express = require("express");
const router = express.Router();

const mainRouter = require("./main.router");
const authRouter = require("./auth.router");
const promiseRouter = require("./promise.router");
const reviewRouter = require("./review.router");

router.use("/auth", authRouter);
router.use("/promise", promiseRouter);
router.use("/main", mainRouter);
router.use("/review", reviewRouter);

/**
 * @swagger
 *   description: CLIPs API
 */

module.exports = router;
