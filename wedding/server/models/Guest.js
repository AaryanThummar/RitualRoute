const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    side: {
      type: String,
      enum: ['Bride', 'Groom', 'Both'],
      default: 'Both',
    },
    culture: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Declined'],
      default: 'Pending',
    },
    dietary: {
      type: String,
      default: 'No Restrictions',
    },
    invitedEvents: {
      type: [String],
      default: [],
    },
    plusOne: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Guest', guestSchema);
