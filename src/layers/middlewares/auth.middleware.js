const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;
// const AuthRepository = require("../layers/repositories/auth.repository");
// const authRepository = new AuthRepository();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [Type, token] = (authorization || "").split(" ");

  try {
    if (!token || Type !== "Bearer") {
      return res.status(400).json({
        message: "로그인 되어있지 않습니다.",
      });
    }

    const tokenValue = jwt.verify(token, env.ACCESS_SECRET);
    res.locals.userId = tokenValue.userId;
  } catch (err) {
    return res.status(400).json({ message: "토큰이 유효하지 않습니다." });
  }

  next();
};
