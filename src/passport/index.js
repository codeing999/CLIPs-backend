const passport = require("passport");
const User = require("../sequelize/models/user");

passport.serializeUser((user, done) => {
  done(null, user.id); //req.session에 user.id만 저장
});

passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } })
    .then((User) => done(null, User))
    .catch((err) => done(err));
});
