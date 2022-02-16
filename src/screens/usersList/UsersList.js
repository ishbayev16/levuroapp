import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/users.actions";

function UsersList(props){

    const {message,loading} = useSelector(state => state.settingsReducer);
    const {response, error} = useSelector(state => state.usersReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(!response){
            dispatch(getUsers())
        }
    },[]);

    return(
        <div>
            users list
        </div>
    )
}

export default UsersList;