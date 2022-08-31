const express = require("express");
const router = express.Router();

const mainRouter = require("./main.router");
//const authRouter = require("./auth.router");

router.use("/main", mainRouter);

module.exports = router;
