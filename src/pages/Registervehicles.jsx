import { useState } from "react";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

const Registervehicles = () => {

    const [arrayVehicle, setArrayVehicle] = useState([]);//Almacenar las motos por usuario

    const [controllerForm, setControllerForm] = useState({ id: '', placa: '', marca: '', modelo: '', estado: 'libre' });//Controlar los eventos del formulario.

    const [arrayEdit, setArrayEdit] = useState(null);


    //Handle block

    const handleSubmitVehicle = (e) => {
        e.preventDefault();
        if (arrayEdit !== null) {
            const originalArrayEdit = [...arrayVehicle] // almacena el array
            const car = originalArrayEdit.find(car => car.id === arrayEdit); //Filtra por id de carro
            car.placa = controllerForm.placa;
            car.marca = controllerForm.marca;
            car.modelo = controllerForm.modelo;
            setArrayVehicle(originalArrayEdit);//capturamos el array modificado
            setArrayEdit(null);
            setControllerForm({ id: '', placa: '', modelo: '', marca: '', estado: 'libre' });
        } else {
            if (controllerForm.placa !== '' && controllerForm.modelo !== '' && controllerForm.marca !== '') {
                //Agregar moto
                const list = controllerForm;
                list.id = uuidv4();
                Swal.fire({
                    icon: 'success',
                    title: 'Saved',
                    text: 'Vehicle saved!',
                    confirmButtonText: 'Ok'
                });
                setArrayVehicle([...arrayVehicle, list]);
                setControllerForm({ placa: '', modelo: '', marca: '', estado: 'libre' });
                console.log(list);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Please, verify the data send`,
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
        setControllerForm({ placa: car.placa, modelo: car.modelo, marca: car.marca, estado: car.estado });
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
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehice Plate: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.placa ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle plate" name="placa" value={controllerForm.placa} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Model: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.modelo ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle model" name="modelo" value={controllerForm.modelo} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Vehicle Brand: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.marca ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Vehicle brand" name="marca" value={controllerForm.marca} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Status: </h4> </div>
                                <select className="form-control w-50" name="estado" disabled>
                                    <option value="Ingreso">Free</option>
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
                        <hr />
                        {
                            arrayVehicle.length === 0 ? (
                                <p className="d-flex w-auto text-center text-secondary fs-1">Don't saved Vehicles</p>
                            ) :
                                arrayVehicle.map((car) => (
                                    <div key={car.id} className="d-flex col-12 mb-2">
                                        <div className="d-flex col-4 justify-content-around">
                                            <input type="submit" className="btn btn-danger h-auto" value="Delete" onClick={() => handleSubmitDelete(car.id)} />
                                            <input type="button" className="btn btn-warning h-auto" value="Edit" onClick={() => handleSubmitEdit(car.id)} />
                                        </div>
                                        <div className="col-2"><h5> {car.placa} </h5></div>
                                        <div className="col-2"><h5> {car.modelo} </h5></div>
                                        <div className="w-100">
                                            <span className={`d-flex bagde rounded-pill bg-success align-items-center justify-content-center w-auto p-2 text-light`}>
                                                {car.estado}
                                            </span>
                                        </div>
                                    </div>
                                ))
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registervehicles;