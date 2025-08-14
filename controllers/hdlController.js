var express = require("express");
var router = express.Router();
const Ingredients = require("../models/Ingredients");
const HurtAndDisease = require("../models/HurtAndDisease");
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

router.get("/", async function (req, res) {
  const hds = await HurtAndDisease.find();
  res.render("admin/hdl/index", { __: res.__, hds: hds });
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
    hd.relatedIngredients = req.body.relatedIngredients;
    if (req.file) hd.image = "/images/uploads/" + req.file.filename;
    await hd.save();
    res.redirect("/admin/hdl");
  } catch (e) {
    console.error("Error creating ingredient:", e);
    res.redirect("/admin/hdl/create");
  }
});

router.get("/detail/:id", async function (req, res) {
  const hd = await HurtAndDisease.findById(req.params.id).populate(
    "relatedIngredients"
  );
  console.log(hd);
  res.render("admin/hdl/detail", { hd: hd });
});

router.get("/edit/:id", async function (req, res) {
  const ingredients = await Ingredients.find();
  const hd = await HurtAndDisease.findById(req.params.id);
  res.render("admin/hdl/edit", { hd: hd, ingredients: ingredients });
});

router.post("/edit", upload.single("image"), async function (req, res) {
  try {
    const hd = await HurtAndDisease.findById(req.body.id);
    const update = {
      nameMM: req.body.nameMM,
      nameEN: req.body.nameEN,
      category: req.body.category,
      causeMM: req.body.causeMM,
      causeEN: req.body.causeEN,
      treatmentMM: req.body.treatmentMM,
      treatmentEN: req.body.treatmentEN,
      descriptionMM: req.body.descriptionMM,
      descriptionEN: req.body.descriptionEN,
      ageLevelMM: req.body.ageLevelMM,
      ageLevelEN: req.body.ageLevelEN,
      relatedIngredients: req.body.relatedIngredients,
    };
    if (req.file) {
      update.image = "/images/uploads/" + req.file.filename;
      try {
        if (hd.image) {
          await fs.access("public" + hd.image);
          fs.unlinkSync("public" + hd.image);
        }
      } catch (e) {
        console.log("Image error");
      }
    }
    await HurtAndDisease.findByIdAndUpdate(req.body.id, { $set: update });
    res.redirect("/admin/hdl");
  } catch (e) {
    console.log(e);
    res.redirect("/admin/hdl/edit/" + req.body.id);
  }
});

router.post("/popularFeature", async function (req, res) {
  try {
    if (req.body.action == "add") {
      await HurtAndDisease.findByIdAndUpdate(req.body.id, {
        $set: { isPopular: true },
      });
    } else {
      await HurtAndDisease.findByIdAndUpdate(req.body.id, {
        $set: { isPopular: false },
      });
    }
    res.json({ status: "success" });
  } catch (e) {
    console.log(e);
    res.json({ status: "error", message: "Somethings was wrong" });
  }
});

module.exports = router;
