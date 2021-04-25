const User = require('../models/user');
const md5 = require('md5');
const sql = require("../config/db");

exports.create = (req, res) => {

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Invalid Paramters"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    password: md5(req.body.password)
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      if(err && err.errno===1062) {
        return res.status(409).send({
          message: `User already exist with the details provided !`
        })
      }
      res.status(500).send({
        message:
          err.message || "Oops ! unable to create the user."
      });
    }
    else res.send(data);
  });

};

// Find a single User with a id
exports.findOne = (req, res) => {

  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.err_msg === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
  
};

exports.searchUser = async (req, res) => {

  req.query.key = req.query.key ? req.query.key.toLowerCase() : '';

  sql.query(`SELECT id,name,email from users where status_id=1 AND id!=${req.query.id} AND ( LOWER(users.name) LIKE  "%${req.query.key}%" OR LOWER(users.email) LIKE "%${req.query.key}%" )`, (err, result) => {

    if (err) {
      console.log("error: ", err);
      res.status(500).send({error: 'Unable to fetch user details'})
    }

    res.send(result);

  });

};