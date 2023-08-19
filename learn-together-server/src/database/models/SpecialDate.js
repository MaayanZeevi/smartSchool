const mongoose = require("mongoose");

const SpecialDateSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  time: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  students: {
    type: [mongoose.SchemaTypes.String],
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("SpecialDate", SpecialDateSchema);
