import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import Swal from 'sweetalert2';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

  const [useUser, setuseUser] = useState(null);

  const [vehicle, setVehicle] = useState([]);

  const addVehicle = (veh) => {
    setVehicle((vehicles) => [...vehicles, veh]);
  }

  const userProvider = "admin";
  const passwordProvider = "7z@Pq9Fv*YcXgT!";
  const navigate = useNavigate();

  const login = (username, password) => {
    if (userProvider == username && passwordProvider == password) {
      setuseUser(username);
      Swal.fire({
        icon: 'success',
        title: 'Login!',
        text: 'Your´re login!',
        confirmButtonText: 'Ok'
      });
      navigate('/SearchVehicle');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Username or password incorrects',
        confirmButtonText: 'Ok'
      });
      setuseUser(null);
    }
  };

  const logout = (off) => {
    if (!off) {

    } else {
      setuseUser(null);
      navigate('/');
    }
  }

  return (
    <LoginContext.Provider value={{ useUser, login, logout, addVehicle, vehicle }}>
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