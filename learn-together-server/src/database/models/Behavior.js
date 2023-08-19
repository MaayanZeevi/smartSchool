const mongoose = require("mongoose");

const BehaviorSchema = new mongoose.Schema({
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  date: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  student: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  lessonNumber: {
    type: mongoose.SchemaTypes.Number,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("Behavior", BehaviorSchema);
