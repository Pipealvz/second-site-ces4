import { useState } from "react";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import SearchVehicle from "./SearchVehicle";
import { useLogin } from "../context/LoginProvider";


const Registervehicles = () => {

    const { addVehicle, vehicle } = useLogin();

    const [arrayVehicle, setArrayVehicle] = useState([]);//Almacenar las motos por usuario

    const [controllerForm, setControllerForm] = useState({ id: '', placa: '', marca: '', comodin: '', tipo: '', document: '', estado: true });//Controlar los eventos del formulario.

    const [arrayEdit, setArrayEdit] = useState(null);

    //Handle block

    const handleSubmitVehicle = (e) => {
        e.preventDefault();
        if (arrayEdit !== null) {
            const originalArrayEdit = [...arrayVehicle] // almacena el array
            const car = originalArrayEdit.find(car => car.id === arrayEdit); //Filtra por id de carro
            car.placa = controllerForm.placa;
            car.marca = controllerForm.marca;
            car.comodin = controllerForm.comodin;
            car.estado = controllerForm.estado;
            car.document = controllerForm.document;
            car.tipo = controllerForm.tipo;
            setArrayVehicle(originalArrayEdit);//capturamos el array modificado
            <SearchVehicle data={originalArrayEdit} />
            setArrayEdit(null);
            setControllerForm({ id: '', placa: '', comodin: '', marca: '', tipo: '', document: '', estado: true });
        } else {
            if (controllerForm.placa !== '' && controllerForm.comodin !== '' && controllerForm.marca !== '') {
                //Agregar vehiculo
                if (arrayVehicle.some(car => car.placa === controllerForm.placa)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'This Vehicle exists',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    const list = controllerForm;
                    const lastType = list.tipo;
                    list.id = uuidv4();
                    Swal.fire({
                        icon: 'success',
                        title: 'Saved',
                        text: 'Vehicle saved!',
                        confirmButtonText: 'Ok'
                    });
                    setArrayVehicle([...arrayVehicle, list]);
                    setControllerForm({ placa: '', comodin: '', marca: '', tipo: lastType, document: '', estado: true });
                    console.log(list);
                    addVehicle({ list });
                    console.log(vehicle);
                    <SearchVehicle data={list} />
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Please verify the submitted data`,
                    confirmButtonText: 'Ok'
                });
            }
        }
    }

    const handleSubmitDelete = (id) => {
        const updateListTodo = arrayVehicle.filter(car => car.id !== id);
        setArrayVehicle(updateListTodo);
        //console.log(updateListTodo);
    }

    const handleSubmitEdit = (id) => {
        const car = arrayVehicle.find(car => car.id === id);
        setControllerForm({ placa: car.placa, comodin: car.comodin, marca: car.marca, estado: car.estado, document: car.document, tipo: car.tipo });
        setArrayEdit(id);
        console.log(id)
    }

    const handleChangeForm = ({ target }) => {
        setControllerForm({ ...controllerForm, [target.name]: target.value });
        //console.log(controllerForm);
        //console.log(target.value)
    }

    return (
        <>
            <div className="container-fluid vh-100 p-3">
                <form className="p-3 form-control shadow rounded mb-4">
                    <h1>Register Vehicle</h1>
                </form>
                <hr />
                <div className="d-flex p-3">
                    <div className="container form-control w-50 h-auto shadow rounded">
                        <form className="" onSubmit={handleSubmitVehicle} onChange={handleChangeForm}>
                            <br />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehicle Plate: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.placa ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle plate" name="placa" value={controllerForm.placa} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Model/Cylinder: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.comodin ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle model" name="comodin" value={controllerForm.comodin} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehicle Brand: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.marca ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle brand" name="marca" value={controllerForm.marca} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> User Document: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.document ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="User document" name="document" value={controllerForm.document} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Type: </h4> </div>
                                <select className="form-control w-50" name="tipo" value={controllerForm.tipo}>
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
                    <form className="container form-control shadow rounded w-50">
                        <div className="d-flex justify-content-between">
                            <h3> Vehicles </h3>
                            <span className="d-flex bagde bg-primary rounded-pill align-items-center justify-content-center w-auto p-2 text-light">{arrayVehicle.length}</span>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Actions</th>
                                    <th scope="col">Plate</th>
                                    <th scope="col">Model/Cylinder</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">User id</th>
                                </tr>
                            </thead>
                            {vehicle.map(car => {
                                <p>{car.id}</p>
                            })}
                            <tbody >
                                {
                                    arrayVehicle.length === 0 ? (
                                        <p className="d-flex w-100 text-center text-secondary fs-1">No vehicles added</p>
                                    ) :
                                        arrayVehicle.map((car) => (
                                            <tr key={car.id}>
                                                <th scope="row">
                                                    <input type="submit" className="btn btn-danger h-auto w-50" value="Delete" onClick={() => handleSubmitDelete(car.id)} />
                                                    <input type="button" className="btn btn-warning h-auto w-50" value="Edit" onClick={() => handleSubmitEdit(car.id)} />
                                                </th>
                                                <td>{car.placa}</td>
                                                <td>{car.comodin}</td>
                                                <td>{car.tipo}</td>
                                                <td>{car.document}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registervehicles;