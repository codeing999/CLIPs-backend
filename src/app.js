const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

require("dotenv/config");

const indexRouter = require("./layers/routers");
const passportConfig = require("./passport");

// const { sequelize } = require("./sequelize/models"); //force 실행할때

const app = express();
passportConfig(); //패스포트 설정
const port = 3000;

const whitelist = ["https://clipspromise.com", "https://clipspromise.com/"];

app.use(function (req, res, next) {
  req.headers.origin = req.headers.origin || req.headers.referer;
  next();
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(origin);
      callback(new Error("Not Allowed Origin!"));
    }
  },
};

// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
// } else {
//   app.use(morgan("dev"));
// }
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"  - :response-time ms'
  )
);

app.use(cors(corsOptions)); //로컬에서 할 땐 다 주석처리하고 밑에꺼로 다 열고해야함.
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! express-session에 의존하므로 뒤에 위치해야 함
app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다.

app.use("/api", indexRouter);

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(port, "진행해주세요.");
});
