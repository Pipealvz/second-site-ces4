import { NavLink } from "react-router-dom";
import './stileMenu.css';
import { useLogin } from "../context/LoginProvider";
import Swal from "sweetalert2";

const Menu = () => {

    const { useUser, logout } = useLogin();
    console.log(useUser);

    const Logout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'You will exit the application',
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Logout',
            denyButtonText: 'Cancel'
        }).then(result => {
            if (result.isConfirmed) {
                const off = 'null'
                logout(off);
                console.log(logout, off);
            } else { }
        });

    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="container-fluid">
                        <img src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo-shadow.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        {useUser === null ?
                            <ul className="ms-auto navbar-nav">
                                <li className="nav-item">
                                    <NavLink className={`nav-link active`} aria-current="page" to="/">Inicio</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link active`} to="/Login">Ingresar</NavLink>
                                </li>
                            </ul>
                            :
                            <ul className="ms-auto navbar-nav">
                                <li className="nav-item">
                                    <NavLink className={`nav-link active`} aria-current="page" to="/RegisterVehicle">Add Vehicle</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button type="submit" className={`btn btn-light w-100 text-start nav-link active`} onClick={Logout}>Logout</button>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={`nav-link active`} to="/SearchVehicle">Vehicles</NavLink>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Menu;