const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../../swagger/swagger-output.json");

const mainRouter = require("./main.router");
const authRouter = require("./auth.router");
const promiseRouter = require("./promise.router");
const reviewRouter = require("./review.router");

router.use("/auth", authRouter);
router.use("/promise", promiseRouter);
router.use("/main", mainRouter);
router.use("/review", reviewRouter);

router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile)); // 스웨거 파일

module.exports = router;
