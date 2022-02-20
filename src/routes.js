import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./screens/login/Login";
import UsersList from "./screens/usersList/UsersList";
import EditUser from "./screens/editUser/EditUser";
import Layout from "./layout/Layout";

function AppRoutes(props){

    return(
        <Routes>
            <Route path="/" element={<Layout children={<Login />} back={false} logout={false} />} />
            <Route path="/users" element={<Layout children={ <UsersList />} back={false} logout={true} /> } />
            <Route path="/users/:id" element={<Layout children={ <EditUser />} back={true} logout={true}/> }/>
        </Routes>
    )

}

export default AppRoutes;
