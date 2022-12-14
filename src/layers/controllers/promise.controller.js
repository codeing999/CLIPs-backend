const PromiseService = require("../services/promise.service");
const joi = require("joi");
const promise = require("../../sequelize/models/promise");
const Validation = require("../../modules/joiStorage");

class PromiseController {
  promiseService = new PromiseService();
  validation = new Validation();

  createPromise = async (req, res) => {
    const { title, date, location, x, y, friendList, penalty } = req.body;
    const userId = res.locals.userId;
    try {
      await joi
        .object({
          title: this.validation.getTitleJoi(),
          date: this.validation.getDateJoi(),
          location: this.validation.getLocationJoi(),
          x: this.validation.getXJoi(),
          y: this.validation.getYJoi(),
          penalty: this.validation.getPenaltyJoi(),
          userId: joi.number().required(),
          friendList: joi.array(),
        })
        .validateAsync({
          title,
          date,
          location,
          x,
          y,
          penalty,
          userId,
          friendList,
        });

      await this.promiseService.createPromise(
        title,
        date,
        location,
        x,
        y,
        penalty,
        userId,
        friendList
      );

      return res.status(200).send("약속 생성 완료");
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

  searchFriend = async (req, res) => {
    const { friendList } = req.body;
    const userId = res.locals.userId;

    try {
      await joi
        .object({
          friendList: joi.array().length(1),
        })
        .validateAsync({ friendList });

      const result = await this.promiseService.searchFriend(friendList, userId);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

  getAllPromise = async (req, res) => {
    const userId = res.locals.userId;
    try {
      const result = await this.promiseService.getAllPromise(userId);

      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  };

  getPromiseDetail = async (req, res) => {
    const { promiseId } = req.params;
    const userId = res.locals.userId;

    try {
      await joi
        .object({
          promiseId: joi.string().required(),
        })
        .validateAsync({ promiseId });
    } catch (err) {
      return res.status(400).json(err.message);
    }

    try {
      const result = await this.promiseService.getPromiseDetail(
        promiseId,
        userId
      );
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err.message);
    }
  };

  updatePromise = async (req, res) => {
    const { title, date, location, x, y, friendList, penalty } = req.body;
    const { promiseId } = req.params;
    const userId = res.locals.userId;

    try {
      await joi
        .object({
          title: this.validation.getTitleJoi(),
          date: this.validation.getDateJoi(),
          location: this.validation.getLocationJoi(),
          x: this.validation.getXJoi(),
          y: this.validation.getYJoi(),
          penalty: this.validation.getPenaltyJoi(),
          userId: joi.number().required(),
          friendList: joi.array(),
        })
        .validateAsync({
          title,
          date,
          location,
          x,
          y,
          penalty,
          userId,
          friendList,
        });

      const result = await this.PromiseService.updatePromise(
        title,
        date,
        location,
        x,
        y,
        penalty,
        userId,
        friendList,
        promiseId
      );

      return res.status(200).send("약속이 수정되었습니다");
    } catch (err) {
      return res.status(400).json(err.message);
    }
  };

  deletePromise = async (req, res) => {
    const userId = res.locals.userId;
    const { promiseId } = req.params;

    try {
      await joi
        .object({
          userId: joi.number().required(),
          promiseId: joi.string().required(),
        })
        .validateAsync({ userId, promiseId });
    } catch (err) {
      return res.status(400);
    }
    try {
      const result = await this.promiseService.deletePromise(userId, promiseId);
      return res.status(200).json("약속이 삭제되었습니다");
    } catch (err) {
      return res.status(400).json(err.message);
    }
  };
}

module.exports = PromiseController;
