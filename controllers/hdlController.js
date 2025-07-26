var express = require("express");
var router = express.Router();

router.get("/", async function (req, res) {
  res.render("admin/hdl/index", { __: res.__ });
});

router.get("/create", async function (req, res) {
  res.render("admin/hdl/create", { __: res.__ });
});

module.exports = router;
