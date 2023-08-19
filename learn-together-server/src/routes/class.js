const { Router } = require("express");
const { getClassStudents } = require("../utils/students");
const Class = require("../database/models/Class");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { className } = req.query;
    const studentsIds = await getClassStudents(className);
    res.status(200).send(studentsIds);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/all", async (req, res) => {
  try {
    const allClasses = await Class.find({}).exec();
    res.status(200).send(allClasses);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/all/names", async (req, res) => {
  try {
    const allClasses = await Class.find({}).exec();
    res.status(200).send(allClasses.map((clas) => clas.name));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
