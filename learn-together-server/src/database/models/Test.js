const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  startDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    unique: false,
  },
  endDate: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    unique: false,
  },
  moed: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    unique: false,
    default: 1,
  },
  students: {
    type: [mongoose.SchemaTypes.String],
    required: false,
    unique: false,
    default: [],
  },
  teacher: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  type: {
    type: mongoose.SchemaTypes.String,
    default: "test",
    unique: false,
  },
});

module.exports = mongoose.model("tests", TestSchema);
