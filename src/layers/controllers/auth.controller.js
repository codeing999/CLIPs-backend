const joi = require("joi");
const passport = require("passport");

const Validation = require("../../modules/joiStorage");
const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();
  validation = new Validation();

  kakaoLogin = async (req, res, next) => {
    //console.log(req.session.passport.user);
    try {
      const result = await this.authService.kakaoLogin(
        req.session.passport.user
      );

      return res.redirect(
        `https://clipspromise.com/kakao?accesstoken=${result.accessToken}&refreshToken=${result.refreshToken}`
      );
      //res.redirect("https://clipspromise.com/kakao");
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "카카오 소셜 로그인에 실패했습니다." });
    }
  };

  getMyPage = async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      const userInfo = await this.authService.getMyPage(userId);
      console.log(userInfo.data.userId, userId);
      if (userInfo.data.userId === userId) {
        return res
          .status(userInfo.status)
          .json({ data: userInfo.data, message: userInfo.message });
      } else throw new Error();
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "마이페이지 조회에 실패했습니다." });
    }
  };
  updateMyPage = async (req, res, next) => {
    /*
    프론트에서 전달 방식에 따라서 값이 있는 것만
    const updateInfo = req.body; 
    이와 같이 받을지. 아니면, 변경이 없는 것도 변수가 전달되지 확인해야함. 그게 기존값인지 혹은 널값인지도.
    또한, 조이를 적용할지.
    */
    const userId = res.locals.userId;
    const { email, nickname, password, confirm, name, phone, image } = req.body;
    try {
      // if (password !== confirm) {
      //   return res
      //     .status(400)
      //     .json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다" });
      // }
      const result = await this.authService.updateMyPage(
        userId,
        email,
        nickname,
        password,
        name,
        phone,
        image
      );
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "마이페이지 수정에 실패했습니다." });
    }
  };
  signUp = async (req, res, next) => {
    const { email, nickname, password, confirm, name, phone } = req.body;
    const profileImageUrl = req.file?.location;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          nickname: this.validation.getNicknameJoi(),
          password: this.validation.getPasswordJoi(),
          confirm: this.validation.getConfirmJoi(),
          name: this.validation.getNameJoi(),
          phone: this.validation.getPhoneJoi(),
          //image: this.validation.getImageJoi(),
        })
        .validateAsync({
          email,
          nickname,
          password,
          confirm,
          name,
          phone,
          //image,
        });

      if (password !== confirm) {
        return res
          .status(400)
          .json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다" });
      }
      const result = await this.authService.createUser(
        email,
        nickname,
        password,
        name,
        phone,
        profileImageUrl
      );

      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          password: this.validation.getPasswordJoi(),
        })
        .validateAsync({ email, password });

      const result = await this.authService.signIn(email, password);
      return res.status(result.status).json({
        message: result.message,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  checkEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
        })
        .validateAsync({ email });

      const result = await this.authService.checkEmail(email);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
  checkNickname = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      await joi
        .object({
          nickname: this.validation.getNicknameJoi(),
        })
        .validateAsync({ nickname });

      const result = await this.authService.checkNickname(nickname);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
  signOut = async (req, res, next) => {
    const { userId, token } = res.locals;
    try {
      const result = await this.authService.signOut(userId, token);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      cosole.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  reIssue = async (req, res, next) => {
    const { token, userId } = res.locals;
    try {
      const response = await this.authService.reIssue(token, userId);

      return res.status(response.status).json({
        accessToken: response.accessToken,
        message: response.message,
      });
    } catch {
      cosole.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
};
