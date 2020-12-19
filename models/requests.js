const mongoose = require('mongoose');

const Requests = new mongoose.Schema(
  {
    pickupAddress: {
      type: String,
    },
    dropAddress: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reqStatus: {
      type: String,
      default: 'Pending',
    },
    time: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Requests', Requests);
