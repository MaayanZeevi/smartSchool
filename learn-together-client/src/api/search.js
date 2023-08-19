import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const searchStudent = async (details) => {
  const response = await axios.get(
    `${REACT_APP_API_URL}/students?studentDetails=${details}`
  );
  return response.data;
};

module.exports = { searchStudent };
