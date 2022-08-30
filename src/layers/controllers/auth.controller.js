const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();

  signup = async (req, res, next) => {};

  signin = async (req, res, next) => {};
};
