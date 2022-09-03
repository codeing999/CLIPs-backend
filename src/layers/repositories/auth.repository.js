const { User } = require("../../sequelize/models");

module.exports = class AuthRepository {
  createUser = async (name, password, phone, image) => {
    const user = await User.create({
      name: name,
      password: password,
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
  findUserByPhone = async (phone) => {
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });
    return user;
  };
};
