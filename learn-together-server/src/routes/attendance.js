const { Router } = require("express");

const { teacherAuthorization } = require("../middlewares/authorization");
const {
  getCurrentLessons,
  getMySchedule,
  getStringDay,
} = require("../utils/lessons");
const LessonSchedule = require("../database/models/LessonSchedule");

const router = Router();

router.post("/open", teacherAuthorization, async (req, res) => {
  try {
    const { location } = req.body;
    const currentLesson = await getCurrentLessons(req.user.userId, true);
    if (!currentLesson || currentLesson.length === 0)
      return res.status(404).json({ message: "No lesson found" });
    await LessonSchedule.findOneAndUpdate(
      { _id: currentLesson[0]._id },
      { location: location }
    ).exec();
    res.sendStatus(200);
  } catch (error) {}
});

module.exports = router;
