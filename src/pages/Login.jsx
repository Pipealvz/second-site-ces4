import { useContext, useState } from "react";

const Login = () => {

    return (
        <>
            <form className="container">
                <div className="m-auto w-50 mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email@example.com" />
                </div>
                <div className="m-auto w-50 mb-3">
                    <label for="exampleFormControlPass" className="form-label">Password</label>
                    <input type='password' className="form-control" id="exampleFormControlPass" placeholder="Password" />
                </div>
                <div className="m-auto w-50 mb-3 text-center">
                    <input type='button' className="btn btn-success w-50" value='Sing up' />
                </div>
            </form>
        </>
    )
}

export default Login;