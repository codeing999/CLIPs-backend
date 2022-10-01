const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../sequelize/models");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "https://codeing999.shop/api/auth/kakao/callback",
        //callbackURL: "http://localhost:3000/api/auth/kakao/callback", //백엔드 테스트용
      },
      async (accessToken, refreshToken, profile, done) => {
        //console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            // 카카오 플랫폼에서 로그인 했고 & snsId필드에 카카오 아이디가 일치할경우
            where: { snsId: profile.id, provider: "kakao" },
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            //가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            let isDuplicated = 1;
            let userId;
            console.log("###");
            while (isDuplicated) {
              userId = Math.floor(Math.random() * 1000000);
              isDuplicated = await User.findByPk(userId);
            }
            const newUser = await User.create({
              userId: userId,
              email: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName,
              image: profile._json.properties.profile_image,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
