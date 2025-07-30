const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HurtAndDiseaseSchema = new Schema({
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
  causeMM: {
    type: String,
    required: false,
  },
  causeEN: {
    type: String,
    required: false,
  },
  treatmentMM: {
    type: String,
    required: false,
  },
  treatmentEN: {
    type: String,
    required: false,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  relatedIngredients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Ingredients",
    },
  ],
  image: {
    type: String,
    required: false,
  },
  ageLevelMM: {
    type: String,
    required: false,
  },
  ageLevelEN: {
    type: String,
    required: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HurtAndDisease", HurtAndDiseaseSchema);
