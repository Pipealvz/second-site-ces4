import { useState } from 'react';
import { createContext, useContext } from "react";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
    const [arrayVehicle2, setArrayVehicle] = useState([null]);//Almacenar las motos por usuario

    const addVehicle = (veh) => {
        setArrayVehicle((vehicle) => ([...vehicle, veh]));
    }

    return (
        <VehicleContext.Provider value={{
            arrayVehicle2, addVehicle
        }}>
            {children}
        </VehicleContext.Provider>
    );
};


export const UseVehicle = () => {
    const context = useContext(VehicleProvider);
    if (!context) {
        throw new Error(
            "Verify Context ..."
        );
    };
    return context;
};