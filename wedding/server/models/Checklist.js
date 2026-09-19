const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    timeline: {
      type: String,
      default: 'Upcoming',
    },
    category: {
      type: String,
      default: 'General',
    },
    ceremonyTag: {
      type: String,
      default: 'Shared',
    },
    assignedTo: {
      type: String,
      default: 'Couple',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
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

module.exports = mongoose.model('Checklist', checklistSchema);
