const passport = require("passport");
//const local = require("./localStrategy"); // 로컬서버로 로그인할때
const kakao = require("./kakaoStrategy"); // 카카오서버로 로그인할때

const { User } = require("../sequelize/models");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId); //여기에 명시한 값이 req.session.passport에 user라는 이름으로 들어가는 것을 확인. snsId말고 userId로 변경.
  });

  passport.deserializeUser((id, done) => {
    //? 두번 inner 조인해서 나를 팔로우하는 followerid와 내가 팔로우 하는 followingid를 가져와 테이블을 붙인다
    User.findOne({ where: { userId: id } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  //local();
  kakao(); // 구글 전략 등록
};
