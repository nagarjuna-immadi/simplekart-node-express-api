var express = require("express");
var router = express.Router();

var StatesController = require("../controllers/states-controller");

router.get("/", StatesController.getAllStates);

module.exports = router;