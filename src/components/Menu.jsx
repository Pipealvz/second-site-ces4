import { NavLink, Link } from "react-router-dom";
import './stileMenu.css';

const Menu = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div class="container-fluid">
                        <Link class="navbar-brand" to="/RegisterVehicle">
                            <img src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo-shadow.png" alt="" width="30" height="24" class="d-inline-block align-text-top" />
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="ms-auto navbar-nav">
                            <li className="nav-item">
                                <NavLink className={`nav-link active`} aria-current="page" to="/">Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link active`} to="/Login">Ingresar</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </>
    )
}

export default Menu;