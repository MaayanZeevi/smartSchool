import axios from "axios";

import { REACT_APP_API_URL } from "@env";

const sendForgotPassword = async (email) => {
  const result = await axios.post(
    `${REACT_APP_API_URL}/auth/forgot-password`,
    {
      email: email,
    }
  );
  return result;
};

export { sendForgotPassword };
