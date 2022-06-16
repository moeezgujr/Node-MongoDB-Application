const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Doctors", DoctorSchema);
