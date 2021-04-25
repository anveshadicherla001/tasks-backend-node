const sql = require("../config/db");

// constructor
const User = function(user) {
  this.email = user.email;
  this.name = user.name;
  this.mobile = user.mobile;
  this.password = user.password;
};

User.create = (newUser, result) => {

  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    delete newUser['password'];

    result(null, { id: res.insertId, ...newUser });

  });

};

User.findById = (userId, result) => {

  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ err_msg: "user not found" }, null);

  });

};

module.exports = User;