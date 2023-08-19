import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getStudentNameById = async (id) => {
  const result = await axios.get(
    `${REACT_APP_API_URL}/students/getStudentName?studentId=${id}`
  );

  return "result";
};
