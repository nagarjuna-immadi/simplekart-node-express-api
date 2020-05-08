var express = require("express");
var router = express.Router();

var checkAuthentication = require('../middlewares/check-authentication');
var checkIsAdmin = require('../middlewares/check-is-admin');

var CategoryController = require("../controllers/category-controller");

router.get("/", CategoryController.getAll);

router.get("/:categoryId", checkAuthentication, checkIsAdmin, CategoryController.get);
router.post("/add", checkAuthentication, checkIsAdmin, CategoryController.save);
router.put("/update", checkAuthentication, checkIsAdmin, CategoryController.save);
router.delete("/:categoryId", checkAuthentication, checkIsAdmin, CategoryController.delete);

module.exports = router;