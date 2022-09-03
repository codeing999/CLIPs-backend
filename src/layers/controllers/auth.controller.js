const joi = require("joi");
const Validation = require("../../modules/joi_storage");
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
    const { email, password } = req.body;
    try {
      await joi
        .object({
          email: getEmailJoi(),
          password: getPasswordJoi(),
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
};
