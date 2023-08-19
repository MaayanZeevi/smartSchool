import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getBehavior = async () => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/behavior`);
  return data;
};

export const uploadBehavior = async (
  type,
  date,
  student,
  subject,
  lessonNumber
) => {
  const result = await axios.post(`${REACT_APP_API_URL}/behavior`, {
    type,
    date,
    student,
    subject,
    lessonNumber,
  });
  return result;
};
