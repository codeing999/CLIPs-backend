module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [Type, token] = (authorization || "").split(" ");

  try {
    if (token && Type == "Bearer") {
      return res.status(400).json({
        message: "로그인한 상태입니다.",
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({ message: "로그인 상태 검증 실패" });
  }
};
