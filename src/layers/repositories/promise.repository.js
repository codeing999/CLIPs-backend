const db = require("../../sequelize/models");
const { User, Promise } = require("../../sequelize/models");
const sequelize = require("sequelize");

const Friend = db.sequelize.models.Friend;

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

  getAllPromise = async () => {
    try {
      const response = await Promise.findAll({
        order: [["date", "DESC"]],
        attributes: { exclude: ["penalty", "done"] },
      });

      return response;
    } catch (err) {
      const error = new Error("FAILD_SQL");
      error.code = 405;
      throw error;
    }
  };

  getPromiseDetail = async (promiseId) => {
    try {
      const response = await Promise.findOne({
        where: { promiseId: promiseId },
      });

      return response.dataValues;
    } catch (err) {
      const error = new Error("FAILD_SQL");
      error.code = 405;
      throw error;
    }
  };

  findFriend = async (phone) => {
    try {
      const response = await User.findOne({
        attributes: ["phone", "name", "userId"],
        where: { phone: phone },
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
