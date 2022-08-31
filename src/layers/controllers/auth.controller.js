const joi = require("joi");

const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();

  signUp = async (req, res, next) => {
    const { name, password, confirm, phone, image } = req.body;
    try {
      await joi
        .object({
          name: joi.string().required(),
          password: joi.string().required(),
          confirm: joi.string().required(),
          phone: joi.string().required(),
          image: joi.string(),
        })
        .validateAsync({ name, password, confirm, phone, image });
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
    const { phone, password } = req.body;
    try {
      await joi
        .object({
          phone: joi.string().required(),
          password: joi.string().required(),
        })
        .validateAsync({ phone, password });

      const result = await this.authService.signIn(phone, password);
      return res
        .status(result.status)
        .json({ message: result.message, accesstoken: result.accesstoken });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
};
