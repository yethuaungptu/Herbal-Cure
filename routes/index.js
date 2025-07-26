var express = require("express");
var router = express.Router();
var Ingredient = require("../models/Ingredients");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const usefulIngredients = await Ingredient.find({ isUseFul: true });
  res.render("index", { __: res.__, usefulIngredients: usefulIngredients });
});

router.get("/hi", async function (req, res, next) {
  const ingredients = await Ingredient.find();
  res.render("hi", { __: res.__, ingredients: ingredients });
});

router.get("/hi/:id", async function (req, res, next) {
  const ingredient = await Ingredient.findById(req.params.id);
  res.render("detailHi", { __: res.__, ingredient: ingredient });
});

router.get("/hdl", function (req, res, next) {
  res.render("hdl", { __: res.__ });
});

router.get("/dds", function (req, res, next) {
  res.render("dds", { __: res.__ });
});

router.get("/aboutus", function (req, res) {
  res.render("aboutus", { __: res.__ });
});

router.get("/login", function (req, res) {
  res.render("login");
});
module.exports = router;
