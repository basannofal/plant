const express = require("express");
const router = express.Router();

const Plant = require("../components/Plant");

router.route("/addplant").post(Plant.addPlant);
router.route("/fetchplant").get(Plant.fetchPlant);

module.exports = router;
