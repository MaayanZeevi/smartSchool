const mongoose = require("mongoose");

const HomeworkSchema = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  date: {
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

module.exports = mongoose.model("Homework", HomeworkSchema);
