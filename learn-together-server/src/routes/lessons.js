const { Router } = require("express");

const LessonSchedule = require("../database/models/LessonSchedule");
const { teacherAuthorization } = require("../middlewares/authorization");
const { getCurrentLessons } = require("../utils/lessons");

const router = Router();

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const lesson = req.body;
    await LessonSchedule.create(lesson);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const id = req.user.userId;
    const lessons = await LessonSchedule.find({
      $or: [{ class: req.user.classDetails }, { teacher: id }],
    }).exec();
    res.status(200).send(lessons);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/current", async (req, res) => {
  try {
    const currentLesson = await getCurrentLessons(
      req.user.role === "teacher" ? req.user.userId : req.user.classDetails,
      req.user.role === "teacher"
    );
      console.log(currentLesson);
    if (!currentLesson || currentLesson.length === 0)
      return res.status(404).json({ message: "No lesson found" });

    res.status(200).send(currentLesson[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
