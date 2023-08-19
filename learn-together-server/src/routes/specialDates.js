const { Router } = require("express");
const SpecialDate = require("../database/models/SpecialDate");
const { teacherAuthorization } = require("../middlewares/authorization");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const specialDates = await SpecialDate.find({ students: req.user.userId });
    res.status(200).send(specialDates);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const specialDate = req.body;
    await SpecialDate.create(specialDate);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
