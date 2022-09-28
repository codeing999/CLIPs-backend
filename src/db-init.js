require("dotenv").config({ path: "../.env" });

const { sequelize } = require("./sequelize/models");

sequelize
  .sync({ alter: true }) //force or alter
  .then(() => {
    console.log("db connect seccess");
  })
  .catch((err) => {
    console.error(err);
  });
