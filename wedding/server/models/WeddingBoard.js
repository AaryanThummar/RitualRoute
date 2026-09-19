const mongoose = require('mongoose');

const weddingBoardSchema = new mongoose.Schema(
  {
    shareId: {
      type: String,
      unique: true,
      index: true,
    },
    bride: {
      religion: { type: String, required: true },
      community: { type: String, required: true },
      state: { type: String, default: '' },
      language: { type: String, default: '' },
    },
    groom: {
      religion: { type: String, required: true },
      community: { type: String, required: true },
      state: { type: String, default: '' },
      language: { type: String, default: '' },
    },
    prefs: {
      budget: { type: String, default: '' },
      guests: { type: String, default: '' },
      venue: { type: String, default: '' },
      decor: { type: String, default: '' },
      food: { type: String, default: '' },
    },
    curation: {
      isFusion: { type: Boolean, default: false },
      weddingType: { type: String, default: '' },
      overview: { type: String, default: '' },
      ceremony: {
        title: String,
        description: String,
        timeline: [
          {
            time: String,
            event: String,
            detail: String,
          },
        ],
      },
      decor: {
        title: String,
        palette: String,
        florals: String,
        description: String,
        img: String,
      },
      cuisine: {
        title: String,
        description: String,
        highlights: [String],
      },
      venue: {
        title: String,
        recommendations: [
          {
            name: String,
            detail: String,
          },
        ],
        img: String,
      },
      outfit: {
        title: String,
        bride: String,
        groom: String,
        img: String,
      },
      invite: {
        title: String,
        description: String,
      },
      photography: {
        title: String,
        description: String,
        style: String,
        img: String,
      },
      music: {
        title: String,
        description: String,
      },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WeddingBoard', weddingBoardSchema);
