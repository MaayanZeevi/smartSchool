const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  startTime: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  endTime: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  activatedForAttendence: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  lessonNumber: {
    type: mongoose.SchemaTypes.Number,
    required: false,
    unique: false,
  },
  teacher: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  day: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  startDate: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  endDate: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  class: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  location: {
    type: {
      timestamp: Number,
      mocked: Boolean,
      coords: {
        altitude: Number,
        heading: Number,
        altitudeAccuracy: Number,
        latitude: Number,
        speed: Number,
        longitude: Number,
        accuracy: Number,
      },
    },
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("lesson", LessonSchema);
