import axios from "axios";

import { REACT_APP_API_URL } from "@env";
import { getStudentsInClass } from "./class";

export const getHomework = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/homework`);
  return result;
};

export const uploadHomework = async (subject, description, clas) => {
  const students = await getStudentsInClass(clas);

  const result = await axios.post(`${REACT_APP_API_URL}/homework`, {
    subject,
    description,
    students: students.data.map((student) => student.id),
  });
  return result;
};
