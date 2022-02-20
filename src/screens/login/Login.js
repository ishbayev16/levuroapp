import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch} from 'react-redux';
import {API_URL, ERROR_MESSAGE, LOGIN, SUCCESS_MESSAGE, WARNING_MESSAGE} from "../../consts/Consts";
import {setLoading, setMessage} from "../../store/actions";


function Login(props){

    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("lev_token")){
            navigate("/users")
        }
    },[])

    const handleLogin = () =>{

        if(!email || !password){
            return(
                dispatch(setMessage("Email or Password can not be empty",WARNING_MESSAGE))
            )
        }

        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'post',
            url: API_URL + LOGIN,
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        dispatch(setLoading(true));
        axios(config)
            .then(function (response) {
                if(response.status === 200){
                    localStorage.setItem("lev_token", response.data.token);
                    navigate("/users");
                    dispatch(setMessage("login successful",SUCCESS_MESSAGE))
                }else{
                    (setMessage("user not found", ERROR_MESSAGE))
                }
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setMessage("user not found", ERROR_MESSAGE))
                dispatch(setLoading(false))
            });

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
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="email"
                                />
                            </div>
                            <div className="forms-inputs mb-4">
                                <input className="w-50"
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