const db = require("../../sequelize/models");
const { User, Promise } = require("../../sequelize/models");
const Friend = db.sequelize.models.Friend;
const sequelize = require("sequelize");

class PromiseRepository {
  createPromise = async (promiseId, title, date, x, y, penalty, userId) => {
    try {
      await Promise.create({
        promiseId: promiseId,
        title,
        date,
        x,
        y,
        penalty,
        userId: userId,
      });
    } catch (err) {
      console.log(err);
      return err.message;
      //   const error = new Error("FAILD_SQL");
      //   error.code = 405;
      //   throw error;
    }
  };

  createParticipants = async (promiseId, user) => {
    try {
      await Friend.create({
        promiseId,
        userId: user,
      });
    } catch (err) {
      console.log(err);
      return err.message;
      //   const error = new Error("FAILD_SQL");
      //   error.code = 405;
      //   throw error;
    }
  };

  getAllPromise = async (userId) => {
    try {
      const response = await Promise.findAll({
        where: {userId : userId},
        order: [["date", "DESC"]],
        attributes: {
          exclude: ["penalty"],
        },
        include: [{
          model: User,
          through: 'Friend',
          as: "participants",
          attributes: ['name']
        }]
      });

      return response;
    } catch (err) {
      return err.message;
    }
  };

  getPromiseDetail = async (promiseId) => {
    try {
      const response = await Promise.findOne({
        where: { promiseId: promiseId },
        include: [{
          model: User,
          through: 'Friend',
          as: "participants",
          attributes: ['name', 'phone']
        }]
      });

      return response.dataValues;
    } catch (err) {
      const error = new Error("약속이 존재하지 않습니다");
      error.code = 405;
      throw error;
    }
  };

  findFriend = async (nickname) => {
    try {
      const response = await User.findOne({
        attributes: ["userId", "nickname"],
        where: { nickname: nickname },
      });
      return response;
    } catch (err) {
      const error = new Error("친구가 존재하지 않습니다");
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
      const error = new Error("FAILD_SQL_DEL");
      error.code = 405;
      throw error;
    }
  };
}

module.exports = PromiseRepository;
