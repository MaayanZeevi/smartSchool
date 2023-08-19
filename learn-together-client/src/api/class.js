import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getStudentsInClass = async (className) => {
  const result = await axios.get(
    `${REACT_APP_API_URL}/class?className=${className}`
  );
  return result;
};

export const getAllClasses = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/class`);
  return result;
};

export const getAllClassesNames = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/class/all/names`);
  return result;
};
