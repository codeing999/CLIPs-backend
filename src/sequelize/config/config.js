require("dotenv").config();
const env = process.env;

const development = {
  username: env.DB_DEV_USERNAME,
  password: env.DB_DEV_PASSWORD,
  database: env.DB_DEV_DATABASE,
  host: env.DB_DEV_HOST,
  dialect: 'mysql'
  // env.DB_DEV_DIALECT,
};

const production = {
  username: env.DB_PROD_USERNAME,
  password: env.DB_PROD_PASSWORD,
  database: env.DB_PROD_DATABASE,
  host: env.DB_PROD_HOST,
  dialect: env.DB_PROD_DIALECT,
  //port: env.DB_PORT
};

const test = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE_TEST,
  host: env.DB_HOST,
  dialect: 'mysql'
  // env.DB_DIALECT,
  //port: env.MYSQL_PORT
};

module.exports = { development, production, test };