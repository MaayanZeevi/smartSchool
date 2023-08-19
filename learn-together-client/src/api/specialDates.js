import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getSpecialDates = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/specialDates`);
  return result;
};

export const addSpecialDate = async (name, date, time, students) => {
  const result = await axios.post(`${REACT_APP_API_URL}/specialDates`, {
    name,
    date,
    time,
    students,
  });
  return result;
};
