const joi = require("joi");
const Validation = require("../../joi_storage");

const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();
  validation = new Validation();
  signUp = async (req, res, next) => {
    const { email, nickname, password, confirm, name, phone, image } = req.body;
    try {
      await this.validation.validateEmail(email);
      await this.validation.validateNickname(nickname);
      await this.validation.validatePassword(password);
      await this.validation.validateConfirm(confirm);
      await this.validation.validatePhone(phone);
      await this.validation.validateImage(image);

      // 정규표현식 추가 예정
      if (password !== confirm) {
        return res
          .status(400)
          .json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다" });
      }
      const result = await this.authService.createUser(
        name,
        password,
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
          email: joi.string().required().messages({
            "string.base": "휴대폰 번호는 문자열이어야 합니다.",
            "any.required": "휴대폰 번호를 입력해주세요.",
          }),
          password: joi.string().required().messages({
            "string.base": "비밀번호는 문자열이어야 합니다.",
            "any.required": "비밀 번호를 입력해주세요.",
          }),
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
