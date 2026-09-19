const mongoose = require('mongoose');

const traditionSchema = new mongoose.Schema(
  {
    culture: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    religion: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    script: {
      type: String,
      default: '',
    },
    line: {
      type: String,
      default: '',
    },
    primaryCeremony: {
      type: String,
      default: '',
    },
    preCeremony: {
      type: String,
      default: '',
    },
    music: {
      type: String,
      default: '',
    },
    flower: {
      type: String,
      default: '',
    },
    palette: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    keyRituals: [
      {
        name: String,
        description: String,
        timing: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Tradition', traditionSchema);
