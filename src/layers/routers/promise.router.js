const express = require("express");
const promiseRouter = express.Router();
const authMiddlewares = require('../middlewares/auth.middleware')

const PromiseController = require("../controllers/promise.controller");
const promiseController = new PromiseController();

promiseRouter.post("/", authMiddlewares, promiseController.createPromise); //약속 만들기
promiseRouter.get("/", promiseController.getAllPromise); //약속 조회
promiseRouter.get("/:promiseId", promiseController.getPromiseDetail); //약속 상세 조회
promiseRouter.post("/user/check", promiseController.findFriend); //친구찾기
promiseRouter.delete("/:promiseId",authMiddlewares, promiseController.deletePromise); //약속 삭제

module.exports = promiseRouter;
