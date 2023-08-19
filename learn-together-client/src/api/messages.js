import axios from "axios";

import { REACT_APP_API_URL } from "@env";

export const getMessages = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/messages`);
  return result;
};

export const getOutMessages = async () => {
  const result = await axios.get(`${REACT_APP_API_URL}/messages/outMail`);
  return result;
};

export const sendMessage = async (receivers, content, title) => {
  const result = await axios.post(`${REACT_APP_API_URL}/messages`, {
    receivers,
    content,
    title,
  });
  return result;
};
