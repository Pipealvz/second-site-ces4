import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {

    const [vehicle, setVehicle] = useState([])
    const [vehicleF, setVehicleF] = useState([])
    const [parking, setParking] = useState([])

    console.log(parking);

    const addVeh = (veh) => { setVehicle((listVeh) => [...listVeh, veh]) };
    console.log(vehicle);

    const searchUserVehicle = (documento) => {
        //console.log(documento)
        const findVehicle = vehicle.filter(veh => veh.documento === documento);
        setVehicleF(findVehicle);
    }

    const deleteVehicle = (placa) => {
        const deleteVeh = vehicle.filter(veh => veh.placa !== placa);
        setVehicle(deleteVeh);
        //console.log(deleteVeh)
    }

    const updateVehicle = (vehi) => {
        if (vehi !== -1) {
            const libre = false
            const array = [...vehicle]
            setVehicle(...vehicle, array[vehi].libre = libre);
        }
    }

    //console.log("FIND VEHICLE:", vehicleF);

    return (

        <VehicleContext.Provider value={{ vehicle, addVeh, searchUserVehicle, vehicleF, deleteVehicle, updateVehicle }}>
            {children}
        </VehicleContext.Provider>
    )
}