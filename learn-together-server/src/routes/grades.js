const { Router } = require("express");
const Grade = require("../database/models/Grade");
const { teacherAuthorization } = require("../middlewares/authorization");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user.userId });
    res.status(200).json(grades);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { subject, grade, date, student, type } = req.body;
    await Grade.create({ subject, grade, date, student, type });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
