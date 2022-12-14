const db = require("../../sequelize/models");
const { User, Promise } = require("../../sequelize/models");
const Friend = db.sequelize.models.Friend;
const { sequelize, Op } = require("sequelize");

class PromiseRepository {
  createPromise = async (
    promiseId,
    title,
    date,
    location,
    x,
    y,
    penalty,
    userId
  ) => {
    try {
      await Promise.create({
        promiseId: promiseId,
        title,
        date,
        location,
        x,
        y,
        penalty,
        userId,
      });
    } catch (err) {
      console.log(err);
      const error = new Error(err);
      error.code = 405;
      throw error;
    }
  };

  createParticipants = async (participantList) => {
    try {
      await Friend.bulkCreate(participantList);
    } catch (err) {
      console.log(err);
      const error = new Error(err);
      error.code = 405;
      throw error;
    }
  };

  getAllPromise = async (userId) => {
    try {
      const madePromise = await Promise.findAll({
        where: { userId: userId },
        order: [["date", "DESC"]],
        attributes: {
          exclude: ["penalty"],
        },
        include: [
          {
            model: User,
            through: "Friend",
            as: "participants",
            attributes: ["name"],
          },
        ],
      });

      const includedPromise = await Promise.findAll({
        order: [["date", "DESC"]],
        attributes: {
          exclude: ["penalty"],
        },
        include: [
          {
            model: User,
            through: "Friend",
            as: "participants",
            where: { userId: userId },
            attributes: ["name"],
          },
        ],
      });

      return [...madePromise, ...includedPromise];
    } catch (err) {
      console.log(err);
      const error = new Error(err);
      error.code = 405;
      throw error;
    }
  };

  getPromiseDetail = async (promiseId) => {
    try {
      const response = await Promise.findOne({
        where: { promiseId: promiseId },
        include: [
          {
            model: User,
            through: "Friend",
            as: "participants",
            attributes: ["nickname", "phone"],
          },
        ],
      });

      return response.dataValues;
    } catch (err) {
      console.log(err);
      const error = new Error("????????? ???????????? ????????????");
      error.code = 405;
      throw error;
    }
  };

  updatePromise = async (
    title,
    date,
    location,
    x,
    y,
    penalty,
    userId,
    friendList
  ) => {
    try {
      await Promise.update(title, date, location, x, y, penalty);
    } catch (err) {
      console.log(err);
      const error = new Error(err);
      error.code = 405;
      throw error;
    }
  };

  findFriend = async (nickname, userId) => {
    try {
      const response = await User.findOne({
        attributes: ["userId", "nickname", "image"],
        where: {
          nickname,
          userId,
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      const error = new Error("????????? ???????????? ????????????");
      error.code = 405;
      throw error;
    }
  };

  searchFriend = async (nickname, userId) => {
    try {
      const response = await User.findAll({
        attributes: ["userId", "nickname", "image"],
        where: {
          nickname: {
            [Op.substring]: `${nickname}`,
          },
          userId: {
            [Op.ne]: userId,
          },
        },
      });
      return response;
    } catch (err) {
      console.log(err);
      const error = new Error("????????? ???????????? ????????????");
      error.code = 405;
      throw error;
    }
  };

  deletePromise = async (userId, promiseId) => {
    try {
      return await Promise.destroy({
        where: { promise_id: promiseId },
      });
    } catch (err) {
      const error = new Error(err);
      error.code = 405;
      throw error;
    }
  };
  findUser = async (userId) => {
    try {
      return await User.findOne({
        where: { userId: userId },
        attributes: ["nickname"],
      });
    } catch (err) {
      const error = new Error("????????? ???????????? ????????????");
      error.code = 405;
      throw error;
    }
  };
}

module.exports = PromiseRepository;
