const { User } = require("../../sequelize/models");

module.exports = class AuthRepository {
  createUser = async (email, nickname, password, name, phone, image) => {
    const user = await User.create({
      email: email,
      nickname: nickname,
      password: password,
      name: name,
      phone: phone,
      image: image,
    });
    return user;
  };
  findUserLogin = async (email, password) => {
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    return user;
  };
  findUserByEmail = async (email) => {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  };
  findUserByNickname = async (nickname) => {
    const user = await User.findOne({
      where: {
        nickname: nickname,
      },
    });
    return user;
  };

  //세션 관련
  createSession = async (userId, token) => {
    const session = await Session.create({ userId, token });

    return session;
  };

  findSession = async (userId, token) => {
    const session = await Session.findOne({
      where: { userId, token },
    });

    return session;
  };

  findSessionByUserId = async (userId) => {
    const session = await Session.findOne({ where: { userId } });

    return session;
  };

  deleteSession = async (sessionId) => {
    const success = await Session.destroy({ where: { sessionId } });

    return success;
  };
};
