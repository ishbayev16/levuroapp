import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserById, setEmptyUser} from "../../store/actions/users.actions";
import { useNavigate, useParams} from "react-router-dom";
import {setLoading, setMessage} from "../../store/actions";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import {ERROR_MESSAGE} from "../../consts/Consts";
import EditForm from "./components/EditForm";


function EditUser(props){

    const {message,loading} = useSelector(state => state.settingsReducer);
    const {singleUser, singleUserError} = useSelector(state => state.usersReducer);

    const [localUser, setLocalUser] = useState(null);

    useEffect(()=>{
        setLocalUser(singleUser);
    },[singleUser, singleUserError])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        if(id !=="new"){
            dispatch(getUserById(id))
        }else{
            dispatch(setEmptyUser())
        }

    },[]);

    const handleLogOut = () =>{
        dispatch(setLoading(true));
        localStorage.removeItem("lev_token");
        setTimeout(()=>{
            dispatch(setLoading(false));
            navigate("/")
        },400)
    }

    const handleEdit = () =>{
        dispatch(setMessage("err", ERROR_MESSAGE));
        console.log("edit", localUser)
    }


    if(loading){
        return (
            <Loading />
        )
    }

    return(
        <div className="position-absolute d-flex flex-column justify-content-start align-items-center h-100 w-100">

            {
                message && message.text && (
                    <Message/>
                )
            }

            <div className="d-flex mb-4 p-4 w-100 justify-content-between">
                <button className="btn w-25 " onClick={()=>navigate("/users")} >Back</button>
                <button className="btn btn-dark w-25" onClick={handleLogOut}>Logout</button>
            </div>

            <div className=" w-75 h-75">

                {/*<div className="ms-4 w-75 h-75 overflow-auto scrollbar scrollbar-secondary"  >*/}

                {/*    <div className="forms-inputs mb-4">*/}
                {/*        <input*/}
                {/*            className="w-50"*/}
                {/*            type="text"*/}
                {/*            value={localUser?.first_name ? localUser?.first_name : ""}*/}
                {/*            onChange={(event) =>*/}
                {/*                setLocalUser({...localUser, first_name: event.target.value})}*/}
                {/*            placeholder="first_name"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="forms-inputs mb-4">*/}
                {/*        <input*/}
                {/*            className="w-50"*/}
                {/*            type="text"*/}
                {/*            value={localUser?.last_name ? localUser?.last_name : ""}*/}
                {/*            onChange={(event) =>*/}
                {/*                setLocalUser({...localUser, last_name: event.target.value})}*/}
                {/*            placeholder="last_name"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="forms-inputs mb-4">*/}
                {/*        <input*/}
                {/*            className="w-50"*/}
                {/*            type="text"*/}
                {/*            value={localUser?.email ? localUser?.email : ""}*/}
                {/*            onChange={(event) =>*/}
                {/*                setLocalUser({...localUser, email: event.target.value})}*/}
                {/*            placeholder="email"*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*    {localUser?.id ?*/}

                {/*        <div className="mb-3">*/}
                {/*            <button className="btn btn-dark w-50" onClick={handleEdit}>Update User</button>*/}
                {/*        </div>:*/}
                {/*        <div className="mb-3">*/}
                {/*            <button className="btn btn-dark w-50" onClick={handleEdit}>Create User</button>*/}
                {/*        </div>*/}
                {/*    }*/}

                {/*</div>*/}

                <EditForm localUser={localUser}/>

            </div>



        </div>
    )
}

export default EditUser;