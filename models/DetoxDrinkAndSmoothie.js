const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetoxDrinkAndSmoothieSchema = new Schema({
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
  benefitMM: {
    type: String,
    required: true,
  },
  benefitEN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredients", // assuming you have an Ingredients model
    },
  ],
  preparationMM: {
    type: String,
    required: true,
  },
  preparationEN: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  recommendedTimeMM: {
    type: String,
    required: true, // e.g., "မနက်ခင်း", "ညအိပ်ချိန်"
  },
  recommendedTimeEN: {
    type: String,
    required: true, // e.g., "Morning", "Before bed"
  },
  ageLevelMM: {
    type: String,
    required: true,
  },
  ageLevelEN: {
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

module.exports = mongoose.model(
  "DetoxDrinkAndSmoothie",
  DetoxDrinkAndSmoothieSchema
);
