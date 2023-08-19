const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  studentsIds: {
    type: [{ id: String, name: String }],
    required: false,
    default: [],
    unique: false,
  },
});

module.exports = mongoose.model("Class", ClassSchema);
