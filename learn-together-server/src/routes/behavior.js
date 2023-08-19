const { Router } = require("express");
const Behavior = require("../database/models/Behavior");
const { teacherAuthorization } = require("../middlewares/authorization");
const { getCurrentLessons } = require("../utils/lessons");
const { haversineDistanceWithAltitude } = require("../utils/location");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const behaviors = await Behavior.find({ student: req.user.userId });
    res.status(200).json(behaviors);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { type, date, student, subject } = req.body;
    await Behavior.create({
      type,
      date,
      student,
      subject,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/inClass", async (req, res) => {
  try {
    const { student, subject, location } = req.body;
    const currentLessons = await getCurrentLessons(
      req.user.classDetails,
      false
    );
    const currentLesson = currentLessons[0];

    if (!currentLesson.location) {
      return res.status(400).json({ message: "No location set" });
    }

    const distance = haversineDistanceWithAltitude(
      {
        latitude: currentLesson.location.coords.latitude,
        longitude: currentLesson.location.coords.longitude,
        altitude: currentLesson.location.coords.altitude,
      },
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        altitude: location.coords.altitude,
      }
    );

    if (distance > 100) {
      return res.status(400).json({ message: "You are not in class" });
    }

    await Behavior.create({
      type: "attendance",
      date: new Date().toISOString(),
      student,
      subject,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
