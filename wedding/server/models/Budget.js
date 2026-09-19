const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      default: 'General',
    },
    item: {
      type: String,
      required: true,
      default: 'Expense Item',
    },
    allocated: {
      type: Number,
      required: true,
      default: 0,
    },
    actual: {
      type: Number,
      default: 0,
    },
    culturalTag: {
      type: String,
      default: 'Both Traditions',
    },
    paid: {
      type: Boolean,
      default: false,
    },
    vendor: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Budget', budgetSchema);
