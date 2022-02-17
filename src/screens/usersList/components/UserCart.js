import React from "react";

function UserCart(props){

    return(
        <div className="border rounded-1  border-1 border-secondary d-flex m-1">
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