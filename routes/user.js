const express = require('express');
const router = express.Router();
const users = require("../controllers/user");
const { isSignedIn } = require("../middlewares/authorization");

router.post("/users", users.create);

router.get("/users/search", isSignedIn, users.searchUser);

router.get("/users/:userId", isSignedIn, users.findOne);

module.exports = router;