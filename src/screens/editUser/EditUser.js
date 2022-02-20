import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserById, setEmptyUser} from "../../store/actions/users.actions";
import { useNavigate, useParams} from "react-router-dom";
import EditForm from "./components/EditForm";

function EditUser(props){

    const {loading} = useSelector(state => state.settingsReducer);
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


    return(
        <div className=" d-flex flex-column justify-content-start align-items-center h-100 w-100">

            <div className=" w-75 h-75">

                {loading ? null :
                    <EditForm localUser={localUser} dispatch={dispatch} navigate={navigate}/>
                }
            </div>

        </div>
    )
}

export default EditUser;