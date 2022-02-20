import axios from "axios";
import React from "react";
import {API_URL, ERROR_MESSAGE, get_token, SUCCESS_MESSAGE, USERS} from "../../consts/Consts";
import {setLoading, setMessage} from "./settings.actions";


export const FETCH_USERS_LIST_SUCCESS = 'FETCH_USERS_LIST_SUCCESS';
export const FETCH_USERS_LIST_ERROR = 'FETCH_USERS_LIST_ERROR';

export function getUsers(page) {

    let config = {
        method: 'get',
        url: page ? API_URL + USERS + "?page=" + page : API_URL + USERS,
        headers: {
            'Authorization': 'Bearer ' + get_token()
        },
    };

    const request = axios(config);
    return dispatch => {
        dispatch(setLoading(true));
        request
            .then(response => {
                if(response.status === 200){
                    dispatch(fetchUsersListSuccess(response.data));
                }else{
                    dispatch(setMessage("Error fetching users", ERROR_MESSAGE));
                }
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(setLoading(false));
                dispatch(setMessage("Error fetching users", ERROR_MESSAGE));
                dispatch(fetchUsersListError());
            })
    }
}

const fetchUsersListSuccess = data => ({
    type: FETCH_USERS_LIST_SUCCESS,
    payload: {
        response: data,
    }
});

const fetchUsersListError = () => ({
    type: FETCH_USERS_LIST_ERROR
});


export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export function getUserById(id) {

    let config = {
        method: 'get',
        url: API_URL + USERS + "?id=" + id,
        headers: {
            'Authorization': 'Bearer ' + get_token()
        },
    };

    const request = axios(config);
    return dispatch => {
        dispatch(setLoading(true));
        request
            .then(response => {
                if(response.status === 200){
                    dispatch(fetchUserSuccess(response.data.data));
                }else{
                    dispatch(setMessage("Error fetching user", ERROR_MESSAGE));
                }
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(setLoading(false))
                dispatch(setMessage("Error fetching user", ERROR_MESSAGE));
                dispatch(fetchUserError());
            })
    }
}

const fetchUserSuccess = data => ({
    type: FETCH_USER_SUCCESS,
    payload: {
        response: data,
    }
});

const fetchUserError = () => ({
    type: FETCH_USER_ERROR
});

export const SET_EMPTY_USER = 'SET EMPTY USER';

export const setEmptyUser = () => ({
    type: SET_EMPTY_USER,
    payload: {
        first_name: "",
        last_name: "",
        email: ""
    }
});

export function editUser(user, navigate){
    let data = JSON.stringify(user);
    let config;

    if(user && user.id){
        config = {
            method: 'patch',
            url: API_URL + USERS +"/" + user.id,
            headers: {
                'Authorization': 'Bearer ' + get_token(),
                'Content-Type': 'application/json'
            },
            data : data
        };
    }else{
        config = {
            method: 'post',
            url: API_URL + USERS,
            headers: {
                'Authorization': 'Bearer ' + get_token(),
                'Content-Type': 'application/json'
            },
            data : data
        };
    }

    const request = axios(config);
    return dispatch => {
        dispatch(setLoading(true));
        request
            .then(response => {
                if(Math.floor(response.status / 100) === 2 ){
                    if(user && user.id){
                        dispatch(setMessage("User updated successfully", SUCCESS_MESSAGE))
                        navigate(-1);
                    }else{
                        dispatch(setMessage("User created successfully", SUCCESS_MESSAGE))
                        navigate(-1);
                    }
                }else{
                    dispatch(setMessage("Something went wrong", ERROR_MESSAGE));
                }
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(setLoading(false))
                dispatch(setMessage("Something went wrong", ERROR_MESSAGE));
            })
    }
}

