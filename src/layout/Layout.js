import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loading from "../components/Loading";
import {setLoading} from "../store/actions";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";


function Layout({children, back, logout}){

    const {message,loading} = useSelector(state => state.settingsReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        if(!localStorage.getItem("lev_token")){
            handleLogOut();
        }
    },[location.pathname]);


    const handleLogOut = () =>{
        dispatch(setLoading(true));
        localStorage.removeItem("lev_token");
        setTimeout(()=>{
            dispatch(setLoading(false));
            navigate("/")
        },400)
    }


    return(
        <div className="position-absolute d-flex flex-column justify-content-start align-items-center h-100 w-100">


            <div className="d-flex mb-4 p-4 w-100 justify-content-between">
                <span>
                {back &&
                <button className="btn w-25 " onClick={()=>navigate(-1)} >Back</button> }
                </span>
                {logout &&
                <button className="btn btn-dark w-25" onClick={handleLogOut}>Logout</button>}
            </div>

            {loading ? <span className="position-absolute h-100 w-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{zIndex: 999}}><Loading /></span>  : null}

            {
                message && message.text && (
                    <Message/>
                )
            }

            {children}
        </div>
    )
}

export default Layout;