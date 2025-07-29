var express = require("express");
var router = express.Router();
const Ingredients = require("../models/Ingredients");
const HurtAndDisease = require("../models/HurtAndDisease");
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

router.get("/", async function (req, res) {
  res.render("admin/hdl/index", { __: res.__ });
});

router.get("/create", async function (req, res) {
  const ingredients = await Ingredients.find();
  res.render("admin/hdl/create", { __: res.__, ingredients: ingredients });
});

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const hd = new HurtAndDisease();
    hd.nameMM = req.body.nameMM;
    hd.nameEN = req.body.nameEN;
    hd.category = req.body.category;
    hd.causeMM = req.body.causeMM;
    hd.causeEN = req.body.causeEN;
    hd.treatmentMM = req.body.treatmentMM;
    hd.treatmentEN = req.body.treatmentEN;
    hd.descriptionMM = req.body.descriptionMM;
    hd.descriptionEN = req.body.descriptionEN;
    hd.ageLevelMM = req.body.ageLevelMM;
    hd.ageLevelEN = req.body.ageLevelEN;
    if (req.file) hd.image = "/images/uploads/" + req.file.filename;
    await hd.save();
    res.redirect("/admin/hdl");
  } catch (e) {
    console.error("Error creating ingredient:", e);
    res.redirect("/admin/hdl/create");
  }
});

module.exports = router;
