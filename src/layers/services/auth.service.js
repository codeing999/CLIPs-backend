const AuthRepository = require("../repositories/auth.repository");

module.exports = class AuthService {
  authRepository = new AuthRepository();
};
