const Class = require("../database/models/Class");

const getClassStudents = async (className) => {
  const studentsIds = await Class.find({ name: className }).exec();
  const cla = studentsIds[0];

  return studentsIds[0].studentsIds;
};

module.exports = { getClassStudents };
