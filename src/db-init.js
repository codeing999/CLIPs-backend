const { sequelize } = require("./sequelize/models");

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("db connect seccess");
  })
  .catch((err) => {
    console.error(err);
  });