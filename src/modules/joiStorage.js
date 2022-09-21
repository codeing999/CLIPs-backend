joi = require("joi");

module.exports = class Validation {
  getEmailJoi = () => {
    const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return joi.string().max(30).required().regex(emailRegExp).messages({
      "string.base": "Email은 문자열이어야 합니다.",
      "any.required": "Email을 입력해주세요.",
      "string.pattern.base": "Email이 형식에 맞지 않습니다.",
      "string.max": "Email은 최대 30글자여야 합니다.",
    });
  };
  getNicknameJoi = () => {
    return joi.string().max(8).required().messages({
      "string.base": "닉네임은 문자열이어야 합니다.",
      "any.required": "닉네임을 입력해주세요.",
      "string.max": "닉네임은 최대 8글자여야 합니다.",
    });
  };
  getPasswordJoi = () => {
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return joi
      .string()
      .min(8)
      .max(16)
      .required()
      .regex(passwordRegExp)
      .messages({
        "string.base": "비밀번호는 문자열이어야 합니다.",
        "any.required": "비밀번호를 입력해주세요.",
        "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
        "string.min": "비밀번호는 최소 8글자여야 합니다.",
        "string.max": "비밀번호는 최대 16글자여야 합니다.",
      });
  };
  getConfirmJoi = () => {
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return joi
      .string()
      .min(8)
      .max(16)
      .required()
      .regex(passwordRegExp)
      .messages({
        "string.base": "비밀번호 확인은 문자열이어야 합니다.",
        "any.required": "비밀번호 확인을 입력해주세요.",
        "string.pattern.base": "비밀번호 확인이 형식에 맞지 않습니다.",
        "string.min": "비밀번호 확인은 최소 8글자여야 합니다.",
        "string.max": "비밀번호 확인은 최대 16글자여야 합니다.",
      });
  };
  getNameJoi = () => {
    return joi.string().max(20).required().messages({
      "string.base": "이름은 문자열이어야 합니다.",
      "any.required": "이름을 입력해주세요.",
      "string.max": "이름은 최대 20글자여야 합니다.",
    });
  };
  getPhoneJoi = () => {
    const phoneRegExp = /^01[0-1, 7][0-9]{7,8}$/; //-없이 입력받을 때
    return joi.string().min(10).max(11).required().regex(phoneRegExp).messages({
      "string.base": "휴대폰 번호는 문자열이어야 합니다.",
      "any.required": "휴대폰 번호를 입력해주세요.",
      "string.pattern.base": "휴대폰 번호가 형식에 맞지 않습니다.",
      "string.min": "휴대폰 번호는 최소 10글자여야 합니다.",
      "string.max": "휴대폰 번호는 최대 11글자여야 합니다.",
    });
  };
  getImageJoi = () => {
    return joi.string().messages({
      "string.base": "image URL은 문자열이어야 합니다.",
    });
  };
  getContentJoi = () => {
    return joi.string().min(5).messages({
      "string.base": "후기는 최소 5글자 이상이어야 합니다.",
    });
  };
  getTitleJoi = () => {
    return joi.string().required().messages({
      "any.required": "약속 이름을 입력해주세요.",
    })
  };
  getDateJoi = () => {
    const dateRegExp = /^([1-9]\d{3}.(0[1-9]|1[0-2]).(0[1-9]|[12]\d|3[01])[\ ]([01]?[0-9]|2[0-3]):[0-5][0-9])$/;

    return joi.string().required().regex(dateRegExp).messages({
      "any.required": "약속 날짜를 입력해주세요.",
      "string.pattern.base": "날짜 형식에 맞지 않습니다.",
      "string.base": "날짜 형식은 문자열이어야 합니다.",
    })
  };
  getLocationJoi = () => {
    return joi.string().required().messages({
      "any.required": "위치를 등록해주세요.",
      "string.base": "위치 형식은 문자열이어야 합니다.",      
    })
  };
  getXJoi = () => {
    return joi.number().required().messages({
      "any.required": "위치를 등록해주세요.",
    })
  };
  getYJoi = () => {
    return joi.number().required().messages({
      "any.required": "위치를 등록해주세요.",
    })
  };
  getPenaltyJoi = () => {
    return joi.string().allow('').messages({
      "string.base": "벌칙은 문자열이어야 합니다.",
    })
  };
};
