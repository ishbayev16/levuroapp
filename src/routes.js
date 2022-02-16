import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./screens/login/Login";
import UsersList from "./screens/usersList/UsersList";

function AppRoutes(props){
    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/users" element={<UsersList />} />
        </Routes>

    )

}

export default AppRoutes;
