import React from "react";
import {useNavigate} from "react-router-dom";

function UserCart(props){

    const navigate = useNavigate();
    return(
        <div onClick={()=>navigate("/users/" + props.user.id)} style={{cursor: "pointer"}} className=" border rounded-1  border-1 border-secondary d-flex m-1">
            <img src={props?.user?.avatar} alt="avatar"/>
            <div className="d-flex flex-column justify-content-center ms-4">
                <div>
                    {props?.user?.first_name + " " + props?.user?.last_name}
                </div>
                <div>
                    {props?.user?.email}
                </div>
            </div>
        </div>
    )
}

export default UserCart;