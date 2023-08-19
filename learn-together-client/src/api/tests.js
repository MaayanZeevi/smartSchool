import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getMyTests = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/tests`);
  return result;
};

export const createTest = async (data) => {
  const result = await axios.post(`${REACT_APP_API_URL}/tests`, data);
  return result;
};
