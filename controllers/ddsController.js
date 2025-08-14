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

router.get("/detail/:id", async function (req, res) {
  const dds = await DetoxDrinkAndSmoothie.findById(req.params.id).populate(
    "ingredients"
  );
  res.render("admin/dds/detail", { __: res.__, dds: dds });
});

router.get("/edit/:id", async function (req, res) {
  const dds = await DetoxDrinkAndSmoothie.findById(req.params.id);
  const ingredients = await Ingredients.find();
  res.render("admin/dds/edit", {
    __: res.__,
    dds: dds,
    ingredients: ingredients,
  });
});

router.post("/popularFeature", async function (req, res) {
  try {
    if (req.body.action == "add") {
      await DetoxDrinkAndSmoothie.findByIdAndUpdate(req.body.id, {
        $set: { isPopular: true },
      });
    } else {
      await DetoxDrinkAndSmoothie.findByIdAndUpdate(req.body.id, {
        $set: { isPopular: false },
      });
    }
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", message: "Somethings was wrong" });
  }
});

router.post("/edit", upload.single("image"), async function (req, res) {
  try {
    const dds = await DetoxDrinkAndSmoothie.findById(req.body.id);
    const update = {
      nameMM: req.body.nameMM,
      nameEN: req.body.nameEN,
      category: req.body.category,
      benefitMM: req.body.benefitMM,
      benefitEN: req.body.benefitEN,
      preparationMM: req.body.preparationMM,
      preparationEN: req.body.preparationEN,
      descriptionMM: req.body.descriptionMM,
      descriptionEN: req.body.descriptionEN,
      ageLevelMM: req.body.ageLevelMM,
      ageLevelEN: req.body.ageLevelEN,
      ingredients: req.body.ingredients,
      recommendedTimeMM: req.body.recommendedTimeMM,
      recommendedTimeEN: req.body.recommendedTimeEN,
    };
    if (req.file) {
      update.image = "/images/uploads/" + req.file.filename;
      try {
        if (dds.image) {
          await fs.access("public" + dds.image);
          fs.unlinkSync("public" + dds.image);
        }
      } catch (e) {
        console.log("Image error");
      }
    }
    await DetoxDrinkAndSmoothie.findByIdAndUpdate(req.body.id, {
      $set: update,
    });
    res.redirect("/admin/dds");
  } catch (e) {
    console.log(e);
    res.redirect("/admin/dds/edit/" + req.body.id);
  }
});

module.exports = router;
