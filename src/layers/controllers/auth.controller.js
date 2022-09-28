const joi = require("joi");
const passport = require("passport");

const Validation = require("../../modules/joiStorage");
const AuthService = require("../services/auth.service");

module.exports = class AuthController {
  authService = new AuthService();
  validation = new Validation();

  kakaoLogin = async (req, res, next) => {
    //console.log(req.session.passport.user);
    try {
      const result = await this.authService.kakaoLogin(
        req.session.passport.user
      );

      return res.redirect(
        `https://clipspromise.com/kakao?accesstoken=${result.accessToken}&refreshToken=${result.refreshToken}`
      );
      //res.redirect("https://clipspromise.com/kakao");
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "카카오 소셜 로그인에 실패했습니다." });
    }
  };

  getMyPage = async (req, res, next) => {
    const userId = res.locals.userId;
    try {
      const userInfo = await this.authService.getMyPage(userId);
      console.log(userInfo.data.userId, userId);
      if (userInfo.data.userId === userId) {
        return res
          .status(userInfo.status)
          .json({ data: userInfo.data, message: userInfo.message });
      } else throw new Error();
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "마이페이지 조회에 실패했습니다." });
    }
  };
  updateMyPage = async (req, res, next) => {
    /*
    프론트에서 전달 방식에 따라서 값이 있는 것만
    const updateInfo = req.body; 
    이와 같이 받을지. 아니면, 변경이 없는 것도 변수가 전달되지 확인해야함. 그게 기존값인지 혹은 널값인지도.
    또한, 조이를 적용할지.
    */
    const userId = res.locals.userId;
    const { email, nickname, password, confirm, name, phone, image } = req.body;
    try {
      // if (password !== confirm) {
      //   return res
      //     .status(400)
      //     .json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다" });
      // }
      const result = await this.authService.updateMyPage(
        userId,
        email,
        nickname,
        password,
        name,
        phone,
        image
      );
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "마이페이지 수정에 실패했습니다." });
    }
  };
  signUp = async (req, res, next) => {
    const { email, nickname, password, confirm, name, phone, image } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          nickname: this.validation.getNicknameJoi(),
          password: this.validation.getPasswordJoi(),
          confirm: this.validation.getConfirmJoi(),
          name: this.validation.getNameJoi(),
          phone: this.validation.getPhoneJoi(),
          image: this.validation.getImageJoi(),
        })
        .validateAsync({
          email,
          nickname,
          password,
          confirm,
          name,
          phone,
          image,
        });

      if (password !== confirm) {
        return res
          .status(400)
          .json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다" });
      }
      const result = await this.authService.createUser(
        email,
        nickname,
        password,
        name,
        phone,
        image
      );

      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  signIn = async (req, res, next) => {
    /*
    //? local로 실행이 되면 localstrategy.js를 찾아 실행한다.
    passport.authenticate("local", (authError, user, info) => {
      //? (authError, user, info) => 이 콜백 미들웨어는 localstrategy에서 done()이 호출되면 실행된다.
      //? localstrategy에 done()함수에 로직 처리에 따라 1,2,3번째 인자에 넣는 순서가 달랐는데 그 이유가 바로 이것이다.

      console.log(authError, user, info);
      // done(err)가 처리된 경우
      if (authError) {
        console.error(authError);
        return next(authError); // 에러처리 미들웨어로 보낸다.
      }

      // done(null, false, { message: '비밀번호가 일치하지 않습니다.' }) 가 처리된 경우
      if (!user) {
        // done()의 3번째 인자 { message: '비밀번호가 일치하지 않습니다.' }가 실행
        return res.redirect(`/?loginError=${info.message}`);
      }

      //? done(null, exUser)가 처리된경우, 즉 로그인이 성공(user가 false가 아닌 경우), passport/index.js로 가서 실행시킨다.
      return req.login(user, (loginError) => {
        //? loginError => 미들웨어는 passport/index.js의 passport.deserializeUser((id, done) => 가 done()이 되면 실행하게 된다.
        // 만일 done(err) 가 됬다면,
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        console.log("dd");
        // done(null, user)로 로직이 성공적이라면, 세션에 사용자 정보를 저장해놔서 로그인 상태가 된다.
        return res.send(user);
        //return res.redirect("/"); //세션 쿠키를 부라우저로 보냄.
      });
    })(req, res, next); //! 미들웨어 내의 미들웨어에는 콜백을 실행시키기위해 (req, res, next)를 붙인다.
    */
    const { email, password } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
          password: this.validation.getPasswordJoi(),
        })
        .validateAsync({ email, password });

      const result = await this.authService.signIn(email, password);
      return res.status(result.status).json({
        message: result.message,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  checkEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
      await joi
        .object({
          email: this.validation.getEmailJoi(),
        })
        .validateAsync({ email });

      const result = await this.authService.checkEmail(email);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
  checkNickname = async (req, res, next) => {
    const { nickname } = req.body;
    try {
      await joi
        .object({
          nickname: this.validation.getNicknameJoi(),
        })
        .validateAsync({ nickname });

      const result = await this.authService.checkNickname(nickname);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
  signOut = async (req, res, next) => {
    const { userId, token } = res.locals;
    try {
      const result = await this.authService.signOut(userId, token);
      return res.status(result.status).json({ message: result.message });
    } catch (err) {
      cosole.log(err);
      return res.status(400).json({ message: err.message });
    }
  };

  reIssue = async (req, res, next) => {
    const { token, userId } = res.locals;
    try {
      const response = await this.authService.reIssue(token, userId);

      return res.status(response.status).json({
        accessToken: response.accessToken,
        message: response.message,
      });
    } catch {
      cosole.log(err);
      return res.status(400).json({ message: err.message });
    }
  };
};
