const express = require("express");
const promiseRouter = express.Router();

const PromiseController = require("../controllers/promise.controller");
const promiseController = new PromiseController();

promiseRouter.post("/", promiseController.createPromise); //약속 만들기
promiseRouter.get("/", promiseController.getAllPromise); //약속 조회
promiseRouter.post("/user/check", promiseController.findFriend); //친구찾기

module.exports = promiseRouter;
