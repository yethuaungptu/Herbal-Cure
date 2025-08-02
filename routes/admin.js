var express = require("express");
var router = express.Router();
var hiController = require("../controllers/hiController");
var hdlController = require("../controllers/hdlController");
var ddsController = require("../controllers/ddsController");

/* GET users listing. */
const checkAuth = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/login");
  }
};
router.get("/", checkAuth, function (req, res, next) {
  res.render("admin/index", { __: res.__ });
});

router.get("/logout", checkAuth, function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.use("/hi", checkAuth, hiController);
router.use("/hdl", checkAuth, hdlController);
router.use("/dds", checkAuth, ddsController);

module.exports = router;
