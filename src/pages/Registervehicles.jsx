import { useState, useContext, useEffect } from "react";
import Swal from 'sweetalert2';
import { useLogin } from "../context/LoginProvider";
import { VehicleContext } from "../context/VehiclesProvider";


const Registervehicles = () => {

    const { addVeh, vehicle, searchUserVehicle, vehicleF, deleteVehicle } = useContext(VehicleContext);
    const { useUser } = useLogin();
    //form
    const [placa, setPlaca] = useState('');
    const [comodin, setComodin] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');
    const [documento, setDocumento] = useState('');
    const [libre, setLibre] = useState(true);
    const [buscarVeh, setBuscarVeh] = useState('');
    const [park, setPark] = useState('');
    const [parking, setParking] = useState([
        { id: '0', vehicle: 'None', user: 'None', status: false, date: '', type: 'Carro' },
        { id: '1', vehicle: 'None', user: 'None', status: false, date: '', type: 'Carro' },
        { id: '2', vehicle: 'None', user: 'None', status: false, date: '', type: 'Carro' },
        { id: '3', vehicle: 'None', user: 'None', status: false, date: '', type: 'Carro' },
        { id: '4', vehicle: 'None', user: 'None', status: false, date: '', type: 'Carro' },
        { id: '5', vehicle: 'None', user: 'None', status: false, date: '', type: 'Moto' },
        { id: '6', vehicle: 'None', user: 'None', status: false, date: '', type: 'Moto' },
        { id: '7', vehicle: 'None', user: 'None', status: false, date: '', type: 'Moto' },
        { id: '8', vehicle: 'None', user: 'None', status: false, date: '', type: 'Moto' },
        { id: '9', vehicle: 'None', user: 'None', status: false, date: '', type: 'Moto' }
    ]);

    const addPark = (veh) => {
        setParking((listVeh) => [...listVeh, veh]);
    }

    //Handle block
    const handleSubmitVehicle = (e) => {
        e.preventDefault();
        if (useUser) {
            if (placa !== '' && comodin !== '' && marca !== '' && documento !== '' && tipo !== '') {
                //Agregar vehiculo
                if (vehicle.some(car => car.placa === placa)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'This Vehicle exists',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    const vehicleData = { placa, comodin, marca, tipo, documento, libre };
                    addVeh(vehicleData);
                    setPlaca('');
                    setComodin('');
                    setMarca('');
                    setTipo('');
                    setDocumento('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved',
                        text: 'Vehicle saved!',
                        confirmButtonText: 'Ok'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Please verify the submitted data`,
                    confirmButtonText: 'Ok'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Please, log in on application`,
                confirmButtonText: 'Ok'
            });
        }
    }

    const handleSubmitDelete = (placa) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVehicle(placa);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your vehicle has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const hanldeSearch = (e) => {
        e.preventDefault();
        if (buscarVeh === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Please, enter your document.`,
                confirmButtonText: 'Ok'
            });
        } else if (useUser) {
            const id = buscarVeh;
            searchUserVehicle(id);
            console.log(buscarVeh);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Please, log in on application.`,
                confirmButtonText: 'Ok'
            });
        }
    }

    const handleToPark = (block, vehi) => {
        // var newParking = parking.filter(p => p.id === block);
        const fecha = new Date();
        console.log(vehi);
        // newParking = { id: block, vehicle: vehi.placa, user: vehi.documento, status: true, date: fecha, type: 'Carro' }
        if (vehi.libre === true) {
            if (parking[block].status === false) {
                const updatedParking = parking.map((p) =>
                    p.id === block
                        ? { ...p, vehicle: vehi.placa, user: vehi.documento, status: true, date: fecha }
                        : p
                );
                setParking(updatedParking);
                setPark(parking);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: `This vehicle has been entered successfully.`,
                    confirmButtonText: 'Ok'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `This block have an vehicle.`,
                    confirmButtonText: 'Ok'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `This vehicle are no free.`,
                confirmButtonText: 'Ok'
            });
        }
        //setParking([...parking, newParking]);
        //console.log("New Park", parking);
    }

    useEffect(() => {
        console.log('El estado parking se ha actualizado:', parking);
        console.log("Estado actual de los vehículos:", vehicle);
        setLibre(true);
        console.log(park);
        // Puedes realizar otras acciones aquí después de que el estado se haya actualizado
    }, [parking, libre]);

    return (
        <>
            <div className="container-fluid vh-100 p-3">
                <form className="p-3 form-control shadow rounded mb-4">
                    <h1>Register Vehicle</h1>
                </form>
                <hr />
                <div className="d-flex p-3">
                    <div className="container form-control w-50 h-auto shadow rounded">
                        <form className="" onSubmit={handleSubmitVehicle}>
                            <br />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehicle Plate: </h4> </div>
                                <input className={`form-control w-50 ${!placa ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle plate" name="placa" value={placa} onChange={e => setPlaca(e.target.value)} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Model/Cylinder: </h4> </div>
                                <input className={`form-control w-50 ${!comodin ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle model" name="comodin" value={comodin} onChange={e => setComodin(e.target.value)} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehicle Brand: </h4> </div>
                                <input className={`form-control w-50 ${!marca ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle brand" name="marca" value={marca} onChange={e => setMarca(e.target.value)} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> User Document: </h4> </div>
                                <input className={`form-control w-50 ${documento <= 0 ? 'is-invalid' : 'is-valid'}`} type="number" placeholder="User document" name="document" value={documento} onChange={e => setDocumento(e.target.value)} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Type: </h4> </div>
                                <select className={`form-control w-50 ${!tipo ? 'is-invalid' : 'is-valid'}`} name="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                                    <option value="">Select vehicle type</option>
                                    <option value="Carro">Car</option>
                                    <option value="Moto">Motorcycle</option>
                                </select>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <input className="btn btn-primary w-auto m-auto" type="submit" value="Save" />
                            </div>
                        </form>
                    </div>
                    <div className="ms-1 me-1"></div>
                    <form className="container form-control shadow rounded w-50" onSubmit={hanldeSearch}>
                        <div className="d-flex justify-content-between">
                            <h3> Find vehicles </h3>
                        </div>
                        <hr />
                        <div className="container">
                            <label htmlFor="">Search your vehicles</label>
                            <input className="form-control" type="number" value={buscarVeh} onChange={(e) => { setBuscarVeh(e.target.value) }} />
                        </div>
                        <br />
                        <input className="btn btn-primary" type="submit" value="Search" />
                        <hr />
                        {
                            vehicleF.length === 0 ? (
                                <p className="d-flex w-auto text-center text-secondary fs-1">Don't saved vehicles</p>
                            ) :
                                vehicleF.map((vehi) => (
                                    <>
                                        <div key={vehi.placa} className="d-flex col-12 mb-2">
                                            <ul className="col-8">
                                                <li>
                                                    <div className="col"><h5>Placa: {vehi.placa} </h5></div>
                                                </li>
                                                <li>
                                                    <div className="col"><h5>Usuario: {vehi.documento} </h5></div>
                                                </li>
                                                <li>
                                                    <div className="col"><h5>Marca: {vehi.marca} </h5></div>
                                                </li>
                                                <li>
                                                    <div className="col"><h5>Tipo: {vehi.tipo} </h5></div>
                                                </li>
                                            </ul>
                                            <div className="d-flex col-2 justify-content-around">
                                                <input type="button" className="btn btn-danger h-auto" value="Delete" onClick={() => { handleSubmitDelete(vehi.placa) }} />
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                vehi.tipo === 'Carro' ?
                                                    <>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-info" onClick={() => handleToPark('0', vehi)}>Block: 0 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('1', vehi)}>Block: 1 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('2', vehi)}>Block: 2 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('3', vehi)}>Block: 3 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('4', vehi)}>Block: 4 </button>
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="d-flex justify-content-between">
                                                            <button className="btn btn-info" onClick={() => handleToPark('5', vehi)} >Block: 5 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('6', vehi)} >Block: 6 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('7', vehi)} >Block: 7 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('8', vehi)} >Block: 8 </button>
                                                            <button className="btn btn-info" onClick={() => handleToPark('9', vehi)} >Block: 9 </button>
                                                        </div>
                                                    </>
                                            }
                                        </div>
                                    </>
                                ))
                        }
                    </form>
                </div >
            </div >
            <hr />
            <table className=" container table">
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Vehicle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !park ? '0 cars' :
                            <>
                                {park.map((p) => {
                                    <tr key={p.id}>
                                        <th scope="row">{p.user}</th>
                                        <td>{p.type}</td>
                                        <td>{p.status}</td>
                                        <td>{p.vehicle}</td>
                                    </tr>
                                })
                                }
                            </>
                    }
                </tbody>
            </table>
        </>
    )
}

export default Registervehicles;