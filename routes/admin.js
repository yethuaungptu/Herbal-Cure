var express = require("express");
var router = express.Router();
var hiController = require("../controllers/hiController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin/index", { __: res.__ });
});

router.use("/hi", hiController);

module.exports = router;
