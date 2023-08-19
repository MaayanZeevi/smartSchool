const { Router } = require("express");
const { teacherAuthorization } = require("../middlewares/authorization");
const User = require("../database/models/User");

const router = Router();

router.get("/getStudentName", async (req, res) => {
  const { studentId } = req.query;

  try {
    const userName = await User.find({ userId: studentId }).exec();

    console.log(`${userName[0].firstName} ${userName[0].lastName}`);
    res.status(200).send(`${userName[0].firstName} ${userName[0].lastName}`);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/", teacherAuthorization, async (req, res) => {
  try {
    const { studentDetails } = req.query;
    const student = await User.find({
      $or: [
        { firstName: studentDetails },
        { lastName: studentDetails },
        { userId: studentDetails },
      ],
    }).exec();

    if (!student) return res.sendStatus(404);
    res.status(200).send(student.filter((user) => user.role === "student"));
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
