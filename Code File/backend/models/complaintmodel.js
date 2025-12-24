const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  category: {
    type: String,
    enum: ['Roads', 'Sanitation', 'Water Supply', 'Electricity', 'Garbage Collection', 'Other'],
    required: true
  },
  complaint: { type: String, required: true },
  priority: { type: String, default: "low" },

  // text location (landmark, address)
  location: { type: String, required: true },

  // geo-coordinates
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
