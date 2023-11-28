import { useState } from 'react';
import { createContext, useContext } from "react";

const VehicleContext = createContext();

export const vehicleProvider = ({ children }) => {

    const [arrayVehicle, setArrayVehicle] = useState([]);//Almacenar las motos por usuario

    const addVehicle = (veh) => {
        setArrayVehicle((vehicle) => ([...arrayVehicle, vehicle]));
    }
    return (
        <VehicleContext.Provider value={{
            addVehicle
        }}>
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicle = () => {
    const context = useContext(vehicleProvider);
    if (!context) {
        throw new Error(
            "Error verify Context..."
        );
    };
    return context;
};