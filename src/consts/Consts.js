export const API_URL = "https://reqres.in/api/"
export const LOGIN = "login"
export const USERS = "users"

//Snackbar severity
export const SUCCESS_MESSAGE = "success";
export const INFO_MESSAGE = "info";
export const ERROR_MESSAGE = "error";
export const WARNING_MESSAGE = "warning";


export const get_token = () =>{
    return localStorage.getItem('lev_token');
};