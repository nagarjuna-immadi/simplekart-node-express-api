var express = require("express");
var router = express.Router();

var CitiesController = require("../controllers/cities-controller");

router.get("/", CitiesController.getAllCities);
router.get("/:stateId", CitiesController.getCitiesByState);

module.exports = router;