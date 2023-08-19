const { Router } = require("express");

const { teacherAuthorization } = require("../middlewares/authorization");
const Homework = require("../database/models/Homework");

const router = Router();

// This code finds all homeworks that are assigned to the user. It then sends the homeworks to the client.

router.get("/", async (req, res) => {
  try {
    const homework = await Homework.find({ students: req.user.userId });
    res.status(200).send(homework);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Creates a new homework assignment with the given subject, number of pages, and student ids. Returns 201 if successful. Returns 400 if the request is invalid.

router.post("/", teacherAuthorization, async (req, res) => {
  try {
    const { subject, description, students } = req.body;

    const date = new Date().toLocaleDateString();
    await Homework.create({ subject, description, date, students });
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
