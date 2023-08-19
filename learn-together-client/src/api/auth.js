import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const login = async (userId, password, role) => {
  const result = await axios.post(`${REACT_APP_API_URL}/auth/login`, {
    userId,
    password,
    role: role === 0 ? "parent" : role === 1 ? "teacher" : "student",
  });
  return result;
};

export const loginAsStudent = async (studentId) => {
  const result = await axios.post(`${REACT_APP_API_URL}/auth/login/kid`, {
    childId: studentId,
  });
  return result;
};

export const logout = async () => {
  const result = await axios.post(`${REACT_APP_API_URL}/auth/logout`);
  return result;
};
