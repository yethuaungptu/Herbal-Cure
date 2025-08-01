var express = require("express");
var router = express.Router();
var Ingredients = require("../models/Ingredients");
var DetoxDrinkAndSmoothie = require("../models/DetoxDrinkAndSmoothie");
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

router.get("/", async function (req, res) {
  const dds = await DetoxDrinkAndSmoothie.find();
  res.render("admin/dds/index", { dds: dds });
});

router.get("/create", async function (req, res) {
  const ingredients = await Ingredients.find();
  res.render("admin/dds/create", { __: res.__, ingredients: ingredients });
});

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const dds = new DetoxDrinkAndSmoothie();
    dds.nameMM = req.body.nameMM;
    dds.nameEN = req.body.nameEN;
    dds.recommendedTimeMM = req.body.recommendedTimeMM;
    dds.recommendedTimeEN = req.body.recommendedTimeEN;
    dds.category = req.body.category;
    dds.benefitMM = req.body.benefitMM;
    dds.benefitEN = req.body.benefitEN;
    dds.preparationMM = req.body.preparationMM;
    dds.preparationEN = req.body.preparationEN;
    dds.descriptionMM = req.body.descriptionMM;
    dds.descriptionEN = req.body.descriptionEN;
    dds.ageLevelMM = req.body.ageLevelMM;
    dds.ageLevelEN = req.body.ageLevelEN;
    dds.ingredients = req.body.ingredients;
    if (req.file) dds.image = "/images/uploads/" + req.file.filename;
    await dds.save();
    res.redirect("/admin/dds");
  } catch (e) {
    console.error("Error creating ingredient:", e);
    res.redirect("/admin/dds/create");
  }
});

module.exports = router;
