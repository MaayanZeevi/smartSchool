const LessonSchedule = require("../database/models/LessonSchedule");
const { compareHours } = require("./date");

const getMySchedule = async (studentClass, teacher) => {
  try {
    const schedule = await LessonSchedule.find(
      teacher
        ? {
            teacher: studentClass,
          }
        : {
            class: studentClass,
          }
    ).exec();

    return schedule;
  } catch (error) {
    return undefined;
  }
};

const getStringDay = (schedule) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  let todaySchedule = undefined;

  switch (currentDay) {
    case 0:
      // sunday
      return "sunday";
      break;
    case 1:
      // monday
      return "monday";
      break;
    case 2:
      // tuesday
      return "tuesday";
      break;
    case 3:
      // wednesday
      return "wednesday";
      break;
    case 4:
      // thursday
      return "thursday";
      break;
    case 5:
      // friday
      return "friday";
      break;
    case 6:
      // saturday
      return "saturday";
      break;
    default:
      break;
  }
  return todaySchedule;
};

const getScheduleDay = (schedule) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  let todaySchedule = undefined;

  switch (currentDay) {
    case 0:
      // sunday
      todaySchedule = schedule.filter((lesson) => lesson.day === "sunday");
      break;
    case 1:
      // monday
      todaySchedule = schedule.filter((lesson) => lesson.day === "monday");
      break;
    case 2:
      // tuesday
      todaySchedule = schedule.filter((lesson) => lesson.day === "tuesday");
      break;
    case 3:
      // wednesday
      todaySchedule = schedule.filter((lesson) => lesson.day === "wednesday");
      break;
    case 4:
      // thursday
      todaySchedule = schedule.filter((lesson) => lesson.day === "thursday");
      break;
    case 5:
      // friday
      todaySchedule = schedule.filter((lesson) => lesson.day === "friday");
      break;
    case 6:
      // saturday
      todaySchedule = schedule.filter((lesson) => lesson.day === "saturday");
      break;
    default:
      break;
  }
  return todaySchedule;
};

const getCurrentLessons = async (studentClass, teacher, schedule) => {
  // todo check if the lesson is between the start and end date

  try {
    if (!schedule) schedule = await getMySchedule(studentClass, teacher);

    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentTime = currentDate.toLocaleTimeString().slice(0, 5);

    const todaySchedule = getScheduleDay(schedule);
    console.log(todaySchedule);
    const currentLesson = todaySchedule.filter((lesson) => {
      console.log(lesson.startTime);
      console.log(currentTime);
      return (
        (compareHours(currentTime, lesson.startTime) === 1 ||
          compareHours(currentTime, lesson.startTime) === 0) &&
        compareHours(currentTime, lesson.endTime) === -1
      );
    });

    return currentLesson;
  } catch (error) {
    return [];
  }
};

module.exports = { getMySchedule, getCurrentLessons, getStringDay };
