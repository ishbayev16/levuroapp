import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import Loading from "../../components/Loading";
import {API_URL, ERROR_MESSAGE, LOGIN, SUCCESS_MESSAGE, WARNING_MESSAGE} from "../../consts/Consts";
import Message from "../../components/Message";
import {setLoading, setMessage} from "../../store/actions";


function Login(props){

    const {message,loading} = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

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
                    console.log("if")
                    localStorage.setItem("lev_token", response.data.token);
                    navigate("/users");
                    dispatch(setMessage("login successful",SUCCESS_MESSAGE))
                }else{
                    console.log("else")
                    dispatch(setMessage("user not found", ERROR_MESSAGE))
                }
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                console.log("else err", error)
                dispatch(setMessage("user not found", ERROR_MESSAGE))
                dispatch(setLoading(false))
            });

    }

    if(loading){
        return (
            <Loading />
        )
    }

    return(
        <div className="container mt-5">

            {
                message && message.text && (
                    <Message/>
                )
            }

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