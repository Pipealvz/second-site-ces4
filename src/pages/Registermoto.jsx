import React, { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { useLogin } from "../context/LoginProvider";

const Registermoto = () => {
    
    const { users,login } = useLogin();

    const handleSubmit = (formData) => {
        login('brayanrepo2015@gmail.com', '1234');
      };
      
    console.log("Hello", users);

    const [arrayMoto, setArrayMoto] = useState([]);//Almacenar las motos por usuario

    const [controllerForm, setControllerForm] = useState({ id: '', placa: '', comodin: '', marca: '', estado: 'libre' });//Controlar los eventos del formulario.

    const [arrayEdit, setArrayEdit] = useState(null);


    //Handle block

    const handleSubmitMoto = (e) => {
        e.preventDefault();
        if (arrayEdit !== null) {
            const originalArrayEdit = [...arrayMoto] // almacena el array
            const moto = originalArrayEdit.find(moto => moto.id === arrayEdit); //Filtra por id de moto
            moto.placa = controllerForm.placa;
            moto.comodin = controllerForm.comodin;
            moto.marca = controllerForm.marca;
            setArrayMoto(originalArrayEdit);//capturamos el array modificado
            setArrayEdit(null);
            setControllerForm({ id: '', placa: '', comodin: '', marca: '', estado: 'libre' });
        } else {
            if (controllerForm.placa !== '' && controllerForm.comodin !== '' && controllerForm.marca !== '') {
                //Agregar moto
                const list = controllerForm;
                list.id = uuidv4();
                Swal.fire({
                    icon: 'success',
                    title: 'Saved',
                    text: 'Motorcycle saved!',
                    confirmButtonText: 'Ok'
                });
                setArrayMoto([...arrayMoto, list]);
                setControllerForm({ placa: '', comodin: '', marca: '', estado: 'libre' });
                console.log(list)
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
        const updateListTodo = arrayMoto.filter(todo => todo.id !== id);
        setArrayMoto(updateListTodo);
        //console.log(updateListTodo);
    }

    const handleSubmitEdit = (id) => {
        const moto = arrayMoto.find(moto => moto.id === id);
        setControllerForm({ placa: moto.placa, comodin: moto.comodin, marca: moto.marca, estado: moto.estado });
        setArrayEdit(id);
        //const lastMov = parseFloat(todo.valor);
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
                    <h1>Register Motorcycle</h1>
                </form>
                <hr />
                <div className="d-flex p-3">
                    <div className="container form-control w-50 h-auto shadow rounded">
                        <form className="" onSubmit={handleSubmitMoto} onChange={handleChangeForm}>
                            <br />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Motorcycle Plate: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.placa ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Motorcycle plate" name="placa" value={controllerForm.placa} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Cylinder: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.comodin ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Capacity Motorcycle" name="comodin" value={controllerForm.comodin} />
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex w-auto justify-content-center"> <h4> Motorcycle Brand: </h4> </div>
                                <input className={`form-control w-50 ${!controllerForm.marca ? 'is-invalid' : 'is-valid'}`} type="text" placeholder="Motorcycle brand" name="marca" value={controllerForm.marca} />
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
                                <input className="btn btn-primary w-auto m-auto" type="submit" value="Guardar" />
                            </div>
                        </form>
                    </div>
                    <div className="ms-1 me-1"></div>
                    <form className="container form-control shadow rounded w-50">
                        <div className="d-flex justify-content-between">
                            <h3> Motorcycles </h3>
                            <span className="d-flex bagde bg-primary rounded-pill align-items-center justify-content-center w-auto p-2 text-light">{arrayMoto.length}</span>
                        </div>
                        <hr />
                        {
                            arrayMoto.length === 0 ? (
                                <p className="d-flex w-auto text-center text-secondary fs-1">Don't saved Motorcycles</p>
                            ) :
                                arrayMoto.map((moto) => (
                                    <div key={moto.id} className="d-flex col-12 mb-2">
                                        <div className="d-flex col-4 justify-content-around">
                                            <input type="submit" className="btn btn-danger h-auto" value="Delete" onClick={() => handleSubmitDelete(moto.id)} />
                                            <input type="button" className="btn btn-warning h-auto" value="Edit" onClick={() => handleSubmitEdit(moto.id)} />
                                        </div>
                                        <div className="col-5"><h5> {moto.placa} </h5></div>
                                        <div className="w-100">
                                            <span className={`d-flex bagde rounded-pill align-items-center justify-content-center w-auto p-2 text-light`}>
                                                {moto.valor}
                                            </span>
                                        </div>
                                    </div>
                                ))
                        }
                    </form>

                    <input type="submit" className="btn btn-dark" value='HOLA' onClick={handleSubmit}/>
                </div>
            </div>
        </>
    )
}

export default Registermoto;