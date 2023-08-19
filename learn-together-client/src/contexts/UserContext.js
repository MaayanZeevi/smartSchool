import { createContext, useState } from "react";

import {
  loginAsStudent,
  login as loginHelper,
  logout as logoutHelper,
} from "../api/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (id, password, role) => {
    try {
      const response = await loginHelper(id, password, role);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      throw new Error("שם משתמש או סיסמא לא נכונים");
    }
  };

  const changeUser = (id) => {
    loginAsStudent(id)
      .then((res) => setUser(res.data))
      .catch(console.log);
  };

  const logout = async () => {
    try {
      await logoutHelper();
      // setUser(null);
    } catch (error) {
      console.log("There was an error");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
