import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/users.actions";
import {useNavigate} from "react-router-dom";
import UserCart from "./components/UserCart";


function UsersList(props){

    const {response} = useSelector(state => state.usersReducer);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listInnerRef = useRef();

    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState(null);


    useEffect(()=>{
        if(!response || !response.data.length){
            dispatch(getUsers())
        }
    },[]);



    const onScroll = () => {

        //scrollTop: scrolled height
        //scrollHeight : height of scrollable list
        //clientHeight: height of visible part
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            console.log("sc", scrollTop, scrollHeight, clientHeight)
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("reached bottom", response.page, response.total_pages);
                if(response.page < response.total_pages){
                    dispatch(getUsers(response.page + 1))
                }
            }
        }
    };

    const arraySearch = (array, keyword) => {
        const searchTerm = keyword.trim().toLowerCase()
        //flag "g" : find all rather than stop at first found elemen
        return array.filter(value => {
            return value.first_name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.last_name.toLowerCase().match(new RegExp(searchTerm, 'g')) ||
                value.email.toLowerCase().match(new RegExp(searchTerm, 'g'))
        })
    }

    const handleSearch = () =>{
        if(searchText){
            setSearchResults(arraySearch(response.data, searchText))
        }else{
            setSearchResults(null)
        }
    }


    return(
        <div className=" d-flex justify-content-center align-items-center h-75 w-100">

            <div className=" w-75 h-100">
                <div className="h-25">
                    <div className="d-flex justify-content-start top-0 start-0 mt-4 ms-4">
                        <button className="btn btn-dark w-25" onClick={()=>navigate("/users/new")}>Add New User</button>
                    </div>
                    <div className="mt-4 ms-4 d-flex justify-content-start">
                        <input className="w-50 me-4 rounded-1" type="text" placeholder="search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <button className="btn btn-dark w-25" onClick={handleSearch}>Search</button>
                    </div>
                </div>

                <div className=" h-75 overflow-auto scrollbar scrollbar-secondary"  ref={listInnerRef} onScroll={onScroll}>

                    {searchResults && searchResults.length && searchResults.length > 0 ? searchResults.map(user =>{
                            return (
                                <UserCart user={user} key={user?.email}/>
                            )
                        }) : searchText && searchResults ? <div>No user found for search criteria</div> :

                        response && response.data && response.data.length > 0 && response.data.map(user =>{
                            return (
                                <UserCart user={user} key={user?.email}/>
                            )
                        })

                    }

                </div>

            </div>


        </div>
    )
}

export default UsersList;