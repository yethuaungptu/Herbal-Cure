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

router.get("/detail/:id", async function (req, res) {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("admin/hi/detail", { __: res.__, ingredient: ingredient });
});

router.get("/edit/:id", async function (req, res) {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("admin/hi/edit", { __: res.__, ingredient: ingredient });
});

router.post("/edit", upload.single("image"), async function (req, res) {
  try {
    const ingredient = await Ingredient.findById(req.body.id);
    const update = {
      nameMM: req.body.nameMM,
      nameEN: req.body.nameEN,
      category: req.body.category,
      benefitMM: req.body.benefitMM,
      benefitEN: req.body.benefitEN,
      sideEffectMM: req.body.sideEffectMM,
      sideEffectEN: req.body.sideEffectEN,
      descriptionMM: req.body.descriptionMM,
      descriptionEN: req.body.descriptionEN,
    };
    if (req.file) {
      try {
        fs.unlinkSync("public" + ingredient.image);
        update.image = "/images/uploads/" + req.file.filename;
      } catch (e) {
        console.log("Image error");
      }
    }
    await Ingredient.findByIdAndUpdate(req.body.id, { $set: update });
    res.redirect("/admin/hi");
  } catch (e) {
    console.error("Error updating tip:", e);
    return;
  }
});

router.post("/usefulFeature", async function (req, res) {
  try {
    if (req.body.action == "add") {
      await Ingredient.findByIdAndUpdate(req.body.id, {
        $set: { isUseFul: true },
      });
    } else {
      await Ingredient.findByIdAndUpdate(req.body.id, {
        $set: { isUseFul: false },
      });
    }
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", message: "Somethings was wrong" });
  }
});

module.exports = router;
