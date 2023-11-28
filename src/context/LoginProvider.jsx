import { useState } from 'react';
import { createContext, useContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [useUser, setuseUser] = useState(null);

    const userProvider = "brayanrepo2015@gmail.com";
    const passwordProvider = "1234";

    const login = (username, password) => {
        if (userProvider == username && passwordProvider == password) {
            setuseUser(username);
        } else {
        }
      };
    return (
        <LoginContext.Provider value={{ useUser, login }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
      throw new Error(
        "Error verify Context..."
      );
    };
    return context;
  };