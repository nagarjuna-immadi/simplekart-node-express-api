var express = require("express");
var router = express.Router();

var checkAuthentication = require('../middlewares/check-authentication');
var checkIsAdmin = require('../middlewares/check-is-admin');

var UserController = require("../controllers/user-controller");

router.post("/signup", UserController.insert);
router.post("/login", UserController.login);

router.get("/:userId", checkAuthentication, UserController.getUser);
router.put("/:userId", checkAuthentication, UserController.updateUser);

router.get("/", checkAuthentication, checkIsAdmin, UserController.getAllUsers);
router.delete("/:userId", checkAuthentication, checkIsAdmin, UserController.deleteUser);

module.exports = router;