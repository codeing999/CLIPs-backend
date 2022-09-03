joi = require("joi");

module.exports = class Validation {
  validateEmail = (email) => {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return joi
      .object({
        email: joi
          .string()
          .min(5)
          .max(50)
          .required()
          .regex(emailRegExp)
          .messages({
            "string.base": "Email은 문자열이어야 합니다.",
            "any.required": "Email을 입력해주세요.",
            "string.pattern.base": "Email이 형식에 맞지 않습니다.",
            "string.min": "Email은 최소 5글자여야 합니다.",
            "string.max": "Email은 최대 50글자여야 합니다.",
          }),
      })
      .validateAsync({ email });
  };

  validateNickname = (nickname) => {
    return joi
      .object({
        nickname: joi.string().min(1).max(20).required().messages({
          "string.base": "닉네임은 문자열이어야 합니다.",
          "any.required": "닉네임을 입력해주세요.",
          "string.min": "닉네임은 최소 1글자여야 합니다.",
          "string.max": "닉네임은 최대 20글자여야 합니다.",
        }),
      })
      .validateAsync({ nickname });
  };

  validateName = (name) => {
    return joi
      .object({
        name: joi.string().min(1).max(50).required().messages({
          "string.base": "이름은 문자열이어야 합니다.",
          "any.required": "이름을 입력해주세요.",
          "string.min": "이름은 최소 1글자여야 합니다.",
          "string.max": "이름은 최대 50글자여야 합니다.",
        }),
      })
      .validateAsync({ name });
  };

  validatePassword = (password) => {
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return joi
      .object({
        password: joi
          .string()
          .min(8)
          .max(30)
          .required()
          .regex(passwordRegExp)
          .messages({
            "string.base": "비밀번호는 문자열이어야 합니다.",
            "any.required": "비밀번호를 입력해주세요.",
            "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
            "string.min": "비밀번호는 최소 8글자여야 합니다.",
            "string.max": "비밀번호는 최대 30글자여야 합니다.",
          }),
      })
      .validateAsync({ password });
  };

  validateConfirm = (confirm) => {
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return joi
      .object({
        confirm: joi
          .string()
          .min(8)
          .max(30)
          .required()
          .regex(passwordRegExp)
          .messages({
            "string.base": "비밀번호 확인은 문자열이어야 합니다.",
            "any.required": "비밀번호 확인을 입력해주세요.",
            "string.pattern.base": "비밀번호 확인이 형식에 맞지 않습니다.",
            "string.min": "비밀번호 확인은 최소 8글자여야 합니다.",
            "string.max": "비밀번호 확인은 최대 30글자여야 합니다.",
          }),
      })
      .validateAsync({ confirm });
  };

  validatePhone = (phone) => {
    return joi
      .object({
        phone: joi.string().min(5).max(20).required().messages({
          "string.base": "휴대폰 번호는 문자열이어야 합니다.",
          "any.required": "휴대폰 번호를 입력해주세요.",
          "string.min": "휴대폰 번호는 최소 5글자여야 합니다.",
          "string.max": "휴대폰 번호는 최대 20글자여야 합니다.",
        }),
      })
      .validateAsync({ phone });
  };

  validateImage = (image) => {
    return joi
      .object({
        image: joi.string().messages({
          "string.base": "image URL은 문자열이어야 합니다.",
        }),
      })
      .validateAsync({ image });
  };
};
