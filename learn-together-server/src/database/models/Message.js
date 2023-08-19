const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: {
    type: { id: String, name: String },
    required: true,
    unique: false,
  },
  receivers: {
    type: [mongoose.SchemaTypes.String],
    required: true,
    unique: false,
  },
  content: {
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
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
