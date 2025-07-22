const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientsSchema = new Schema({
  nameMM: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  descriptionMM: {
    type: String,
    required: true,
  },
  descriptionEN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  benefitMM: {
    type: String,
    required: true,
  },
  benefitEN: {
    type: String,
    required: true,
  },
  sideEffectMM: {
    type: String,
    required: true,
  },
  sideEffectEN: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Ingredients", IngredientsSchema);
