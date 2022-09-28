const { User, Session } = require("../../sequelize/models");

module.exports = class AuthRepository {
  createUser = async (
    userId,
    email,
    nickname,
    password,
    name,
    phone,
    image
  ) => {
    const user = await User.create({
      userId: userId,
      email: email,
      nickname: nickname,
      password: password,
      name: name,
      phone: phone,
      image: image,
      snsId: null,
      provider: "local",
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

  findUserById = async (userId) => {
    const user = await User.findOne({
      attributes: ["userId", "email", "nickname", "name", "phone", "image"],
      where: { userId },
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
