const express = require("express");
const app = express();
const port = 3000;
// connect();

// app.use((req, res, next) => {
//   console.log("Request URL:", req.originalUrl, " - ", new Date());
//   next();
// });

// app.use(express.json()); //middleware가 생긴다

// app.use("/api", [goodsrouter, cartsRouter]);

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/kakaolocal.html");
});

// app.get("/", (req, res) => {
//   res.send("Hello World@@@@!");
// });

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
