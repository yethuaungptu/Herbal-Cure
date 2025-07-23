var express = require("express");
var router = express.Router();
var Ingredient = require("../models/Ingredients");
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const ingredients = await Ingredient.find();
  console.log("Ingredients:", ingredients);
  res.render("admin/hi/index", { __: res.__, ingredients: ingredients });
});

router.get("/create", function (req, res, next) {
  res.render("admin/hi/create", { __: res.__ });
});

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    const ingredient = new Ingredient();
    ingredient.nameMM = req.body.nameMM;
    ingredient.nameEN = req.body.nameEN;
    ingredient.category = req.body.category;
    ingredient.benefitMM = req.body.benefitMM;
    ingredient.benefitEN = req.body.benefitEN;
    ingredient.sideEffectMM = req.body.sideEffectMM;
    ingredient.sideEffectEN = req.body.sideEffectEN;
    ingredient.descriptionMM = req.body.descriptionMM;
    ingredient.descriptionEN = req.body.descriptionEN;
    if (req.file) ingredient.image = "/images/uploads/" + req.file.filename;
    await ingredient.save();
    res.redirect("/admin/hi");
  } catch (e) {
    console.error("Error creating ingredient:", e);
    res.redirect("/admin/hi/create");
  }
});

module.exports = router;
