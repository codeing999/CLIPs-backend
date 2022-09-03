const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

const AuthRepository = require("../repositories/auth.repository");

module.exports = class AuthService {
  authRepository = new AuthRepository();

  createUser = async (name, password, phone, image) => {
    try {
      const isExistUser = await this.authRepository.findUserByPhone(phone);
      if (isExistUser)
        return { status: 400, message: "이미 가입한 전화번호 입니다." };
      const user = await this.authRepository.createUser(
        name,
        password,
        phone,
        image
      );
      return { status: 201, message: "회원가입에 성공하였습니다." };
    } catch (err) {
      //console.log(err);
      return { status: 400, message: err.message };
    }
  };
  signIn = async (email, password) => {
    try {
      const user = await this.authRepository.findUserLogin(email, password);
      if (!user)
        return {
          status: 400,
          message: "전화번호 혹은 패스워드가 잘못 되었습니다.",
        };
      const accesstoken = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_OPTION_EXPIRESIN }
      );
      return {
        status: 200,
        message: " 로그인에 성공하였습니다.",
        accesstoken: accesstoken,
      };
    } catch (err) {
      console.log(err);
      return { status: 400, message: "로그인에 실패하였습니다." };
    }
  };
};
