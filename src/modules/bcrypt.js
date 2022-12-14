const bcrypt = require("bcrypt");
require("dotenv/config");

module.exports = class Bcrypt {
  saltRounds;

  constructor() {
    this.saltRounds = process.env.BCRYPT_SALT;
  }

  bcryptPassword = async function (password) {
    const hashedpassword = await bcrypt.hash(password, +this.saltRounds);
    return hashedpassword;
  };
};
