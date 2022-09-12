const joi = require("joi");
const passport = require("passport");

const Validation = require("../../modules/joiStorage");
const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();
  validation = new Validation();
  signUp = async (req, res, next) => {
    const { email, nickname, password, confirm, name, phone, image } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          nickname: this.validation.getNicknameJoi(),
          password: this.validation.getPasswordJoi(),
          confirm: this.validation.getConfirmJoi(),
          name: this.validation.getNameJoi(),
          phone: this.validation.getPhoneJoi(),
          image: this.validation.getImageJoi(),
        })
        .validateAsync({
          email,
          nickname,
          password,
          confirm,
          name,
          phone,
          image,
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
        image
      );
      //예외처리 추가 예정
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  signIn = async (req, res, next) => {
    // passport.authenticate("local", (authError, user, info) => {
    //   if (authError) {
    //     console.error(authError);
    //     return next(authError);
    //   }
    //   if (!user) {
    //     return res.redirect(`/?loginError=${info.message}`);
    //   }
    //   return req.login(user, (loginError) => {
    //     //serializeUser 호출
    //     if (loginError) {
    //       console.error(loginError);
    //       return next(loginError);
    //     }
    //     return res.redirect("/"); //세션 쿠키를 부라우저로 보냄.
    //   });
    // })(req, res, next);
    const { email, password } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          password: this.validation.getPasswordJoi(),
        })
        .validateAsync({ email, password });

      const result = await this.authService.signIn(email, password);
      return res
        .status(result.status)
        .json({ message: result.message, accesstoken: result.accesstoken });
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
};
