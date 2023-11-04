const express = require("express");
const router = express.Router();

const Notification = require("../components/Notification");

router.route("/fetchnotification").get(Notification.fetchNotification);

module.exports = router;
