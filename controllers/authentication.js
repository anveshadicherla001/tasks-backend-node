const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const md5 = require('md5');
const sql = require("../config/db");

exports.signin = async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            field: errors.array()[0].param
        })
    }

    try {

        sql.query(`SELECT * FROM users WHERE email = "${req.body.email}"`, (err, getRecord) => {

            if(!getRecord || !getRecord.length) {
                return res.status(400).json({
                    err: "User email doest not exist"
                })
            }

            if (getRecord.length && getRecord[0].password !== md5(req.body.password)) {
                return res.status(401).json({
                    err: "Invalid credentials"
                })
            }

            //creating token
            const token = jwt.sign({id: getRecord[0].id}, 
                process.env.SECRET
            );

            //storing token in cookie
            res.cookie("token", token, {expire: new Date() + 9999});

            const { id, name, email, mobile, created_at } = getRecord[0];

            res.json({
                token,
                user: {
                    id, name, email, mobile,
                    joined_on: created_at
                }
            })

        });

    }
    catch(e) {
        console.error(e);
        return res.status(500).json({
            err: "Server Error ! Unable to handle the request"
        })
    }
    
};