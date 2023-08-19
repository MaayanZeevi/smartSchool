import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getCurrentLesson = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/lessons/current`);
  return result.data;
};

export const getSchedule = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/lessons`);
  return result.data;
};

export const markInClass = async (student, subject, location) => {
  const result = await axios.post(`${REACT_APP_API_URL}/behavior/inclass`, {
    student,
    subject,
    location,
  });
  return result;
};

export const openClass = async (location) => {
  const result = await axios.post(`${REACT_APP_API_URL}/attendance/open`, {
    location,
  });
  return result;
};
