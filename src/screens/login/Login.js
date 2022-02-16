import React, {useEffect, useState} from 'react';
import {  Link } from "react-router-dom";

function Login(props){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () =>{
        console.log("name", email, password)
    }

    return(
        <div className="container mt-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="card px-5 py-5">
                        <div className="form-data">
                            <div className="forms-inputs mb-4">
                                <input
                                    className="w-50"
                                    autoComplete="off"
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="email"
                                />
                            </div>
                            <div className="forms-inputs mb-4">
                                <input className="w-50"
                                       autoComplete="off"
                                       value={password}
                                       onChange={(e)=>setPassword(e.target.value)}
                                       type="password"
                                       placeholder="password"
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-dark w-50" onClick={handleLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;