import { createContext, useState, useContext } from 'react';

// Crear el contexto
const ParqueaderoContext = createContext();

// Componente proveedor que utilizará el contexto
export const ParqueaderoProvider = ({ children }) => {
    const [celdasMoto, setCeldasMoto] = useState(new Array(5) = {
        id: '',
        numCelda: '',
        state: 'free',
        typeVehicle: ''
    });

    return (
        <ParqueaderoContext.Provider value={{ setCeldasMoto, setCeldasMoto }}>
            {children}
        </ParqueaderoContext.Provider>
    );
};

// Hook personalizado para acceder al contexto
export const UsarParqueadero = () => {
    return useContext(ParqueaderoContext);
};