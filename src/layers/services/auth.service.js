const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Bcrypt = require("../../modules/bcrypt");
require("dotenv/config");

const AuthRepository = require("../repositories/auth.repository");

module.exports = class AuthService {
  authRepository = new AuthRepository();
  bcrypt = new Bcrypt();

  createUser = async (email, nickname, password, name, phone, image) => {
    try {
      const isExistUser = await this.authRepository.findUserByEmail(email);
      if (isExistUser) {
        return { status: 400, message: "이미 가입한 Email 입니다." };
      }

      const hashedPassword = await this.bcrypt.bcryptPassword(password);

      const user = await this.authRepository.createUser(
        email,
        nickname,
        hashedPassword,
        name,
        phone,
        image
      );
      return { status: 201, message: "회원가입에 성공하였습니다." };
    } catch (err) {
      console.log(err);
      return { status: 400, message: err.message };
    }
  };

  signIn = async (email, password) => {
    try {
      const user = await this.authRepository.findUserByEmail(email);
      if (!user) {
        return {
          status: 400,
          result: false,
          message: "존재하지 않는 정보입니다.",
        };
      }

      const hashedPassword = user.password;
      const comparePassword = await bcrypt.compare(password, hashedPassword);
      if (!comparePassword) {
        return {
          status: 400,
          result: false,
          message: "존재하지 않는 정보입니다.",
        };
      }

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
  checkEmail = async (email) => {
    try {
      const isExistUser = await this.authRepository.findUserByEmail(email);
      if (isExistUser) {
        return { status: 400, message: "이미 가입한 Email입니다." };
      } else {
        return { status: 200, message: "사용 가능한 Email입니다." };
      }
    } catch (err) {
      console.log(err);
      return { status: 400, message: "이메일 중복 체크에 실패하였습니다." };
    }
  };

  checkNickname = async (nickname) => {
    try {
      const isExistUser = await this.authRepository.findUserByNickname(
        nickname
      );
      if (isExistUser) {
        return { status: 400, message: "이미 사용 중인 닉네임입니다." };
      } else {
        return { status: 200, message: "사용 가능한 닉네임입니다." };
      }
    } catch (err) {
      console.log(err);
      return { status: 400, message: "닉네임 중복 체크에 실패하였습니다." };
    }
  };
};
