var express = require("express");
var router = express.Router();
var Ingredient = require("../models/Ingredients");
var HurtAndDisease = require("../models/HurtAndDisease");
var DetoxDrinkAndSmoothie = require("../models/DetoxDrinkAndSmoothie");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const usefulIngredients = await Ingredient.find({ isUseFul: true });
  const featuredHurtAndDisease = await HurtAndDisease.find({ isPopular: true });
  const popularDetoxDrinkAndSmoothie = await DetoxDrinkAndSmoothie.find({
    isPopular: true,
  });
  res.render("index", {
    __: res.__,
    usefulIngredients: usefulIngredients,
    featuredHurtAndDisease: featuredHurtAndDisease,
    popularDetoxDrinkAndSmoothie: popularDetoxDrinkAndSmoothie,
  });
});

router.get("/hi", async function (req, res, next) {
  const ingredients = await Ingredient.find();
  res.render("hi", { __: res.__, ingredients: ingredients });
});

router.get("/hi/:id", async function (req, res, next) {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("detailHi", { __: res.__, ingredient: ingredient });
});

router.get("/hdl", async function (req, res, next) {
  const hurtList = await HurtAndDisease.find({ category: "Hurt" });
  const diseaseList = await HurtAndDisease.find({ category: "Disease" });
  res.render("hdl", {
    __: res.__,
    hurtList: hurtList,
    diseaseList: diseaseList,
  });
});

router.get("/hdl/:id", async function (req, res) {
  const hd = await HurtAndDisease.findById(req.params.id).populate(
    "relatedIngredients"
  );
  res.render("detailHdl", { __: res.__, hd: hd });
});

router.get("/dds", async function (req, res, next) {
  const dds = await DetoxDrinkAndSmoothie.find();
  res.render("dds", { __: res.__, dds: dds });
});

router.get("/dds/:id", async function (req, res, next) {
  const dds = await DetoxDrinkAndSmoothie.findById(req.params.id).populate(
    "ingredients"
  );
  res.render("ddsDetail", { __: res.__, dds: dds });
});

router.get("/aboutus", function (req, res) {
  res.render("aboutus", { __: res.__ });
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", function (req, res) {
  if (req.body.email == "hc@admin.com" && req.body.password == "hc2025") {
    req.session.admin = {
      email: "hc@admin.com",
    };
    res.redirect("/admin");
  } else {
    res.redirect("/login");
  }
});
module.exports = router;
