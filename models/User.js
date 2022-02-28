const Sequelize = require("sequelize");
const { db } = require("../db");
const User = db.define("User", {
  username: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique:true
  },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = {
  User,
};
