var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { __: res.__ });
});

router.get("/hi", function (req, res, next) {
  res.render("hi", { __: res.__ });
});

router.get("/hdl", function (req, res, next) {
  res.render("hdl", { __: res.__ });
});
router.get("/dds", function (req, res, next) {
  res.render("dds", { __: res.__ });
});

module.exports = router;
