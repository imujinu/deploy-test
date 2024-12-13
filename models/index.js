"use strict";

const Sequelize = require("sequelize");
let config = require(__dirname + "/../config/config.js");
const env = process.env.NODE_ENV || "development"; // 추가
// development, production, undefined
console.log("env::", env);
console.log("NODE_ENV", process.env.NODE_ENV);

config = config[env]; // "development" > env
// console.log("config>>>", config);
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
// 설정 정보를 sequelize라는 키 안에 넣어주는 중
/* 
{
  sequelize : sequelize
} */
db.Sequelize = Sequelize;
//시퀄라이즈 모듈을 Sequelize key안에 넣어주는 중
/* 
{
  sequelize : sequelize
  Sequelize : Sequelize
} */

db.Visitor = require("./Visitor")(sequelize, Sequelize);
// {

//   sequelize : sequelize
//   Sequelize : Sequelize
//   Visitor : visitor의 모델
// }

module.exports = db; //app.js
