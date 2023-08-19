const { Router } = require("express");

const Test = require("../database/models/Test");
const { teacherAuthorization } = require("../middlewares/authorization");

const router = Router();

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { subject, startDate, endDate, moed, students, type } = req.body;

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);

    startDateObject.setHours(startDateObject.getHours() + 3);
    endDateObject.setHours(endDateObject.getHours() + 3);

    await Test.create({
      subject,
      startDate: startDateObject,
      endDate: endDateObject,
      moed,
      students,
      teacher: req.user.userId,
      type,
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const id = req.user.userId;
    const role = req.user.role;

    if (role === "teacher") {
      return res.status(200).send(await Test.find({ teacher: id }).exec());
    }

    const tests = await Test.find({ students: { $in: [id] } }).exec();
    res.status(200).send(tests);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
