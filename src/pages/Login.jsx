import { useState } from "react";
import { useLogin } from "../context/LoginProvider";

const Login = () => {

    const { login, useUser } = useLogin();

    const [controllerForm, setControllerForm] = useState({ name: 'admin', password: '7z@Pq9Fv*YcXgT!' })

    const handleChangeForm = ({ target }) => {
        setControllerForm({ ...controllerForm, [target.name]: target.value });
        //console.log(controllerForm);
        //console.log(target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(controllerForm.name, controllerForm.password);
        console.log(useUser);
    }

    return (
        <>
            <form className="container" onSubmit={handleLogin} onChange={handleChangeForm}>
                <div className="m-auto w-50 mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="text" className={`form-control ${!controllerForm.name ? 'is-invalid' : 'is-valid'}`} id="exampleFormControlInput1" placeholder="Username" name="name" value={controllerForm.name }/>
                </div>
                <div className="m-auto w-50 mb-3">
                    <label for="exampleFormControlPass" className="form-label">Password</label>
                    <input type='password' className={`form-control ${!controllerForm.password ? 'is-invalid' : 'is-valid'}`} id="exampleFormControlPass" placeholder="Password" name="password" value={controllerForm.password}/>
                </div>
                <div className="m-auto w-50 mb-3 text-center">
                    <input type='submit' className="btn btn-success w-50" value='Sing up' />
                </div>
            </form>
        </>
    )
}

export default Login;