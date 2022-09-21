const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Bcrypt = require("../../modules/bcrypt");
require("dotenv/config");

const AuthRepository = require("../repositories/auth.repository");

module.exports = class AuthService {
  authRepository = new AuthRepository();
  bcrypt = new Bcrypt();

  getMyPage = async (userId) => {
    try {
      const userInfo = this.authRepository.findUserById(userId);
      return {
        data: userInfo,
        status: 201,
        message: "회원가입에 성공하였습니다.",
      };
    } catch (err) {
      console.log(err);
      return { status: 400, message: err.message };
    }
  };
  createUser = async (email, nickname, password, name, phone, image) => {
    try {
      const isExistUser = await this.authRepository.findUserByEmail(email);
      if (isExistUser) {
        return { status: 400, message: "이미 가입한 Email 입니다." };
      }
      //닉네임 중복검사 추가하기
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

      //세션 이미 있으면 제거 후 리프레쉬 토큰 발급 후 세션에 저장
      const isExistSession = await this.authRepository.findSessionByUserId(
        user.userId
      );

      if (isExistSession) {
        await this.authRepository.deleteSession(isExistSession.sessionId);
      }

      const refreshToken = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: process.env.REFRESH_OPTION_EXPIRESIN }
      );

      await this.authRepository.createSession(user.userId, refreshToken);

      //accessToken 발급
      const accessToken = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_OPTION_EXPIRESIN }
      );
      return {
        status: 200,
        message: " 로그인에 성공하였습니다.",
        accessToken: accessToken,
        refreshToken: refreshToken,
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
  signOut = async (userId, token) => {
    try {
      const session = await this.authRepository.findSession(userId, token);
      if (!session) {
        return {
          status: 401,
          message: "로그아웃 된 토큰입니다.",
        };
      }

      await this.authRepository.deleteSession(session.sessionId);

      return { status: 200 };
    } catch (err) {
      console.log(err);
      return { status: 400, message: "로그 아웃에 실패하였습니다." };
    }
  };

  reIssue = async (token, userId) => {
    try {
      const session = await this.authRepository.findSession(userId, token);
      if (!session) {
        return {
          status: 401,
          message: "로그아웃 된 토큰입니다.",
        };
      }

      const user = await this.authRepository.findUserById(session.userId);
      const accessToken = jwt.sign(
        {
          userId: user.userId,
        },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_OPTION_EXPIRESIN }
      );

      return { status: 200, accessToken: accessToken };
    } catch (err) {
      console.log(err);
      return { status: 400, message: "토큰 재발행에 실패하였습니다." };
    }
  };
};
