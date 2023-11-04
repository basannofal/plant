const express = require("express");
const router = express.Router();

const User = require("../components/User");

router.route("/adduser").post(User.addUser);
router.route("/userlogin").post(User.userLogin);

module.exports = router;
