const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  grade: {
    type: mongoose.SchemaTypes.Number,
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
  type: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("Grade", GradeSchema);
