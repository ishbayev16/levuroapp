import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../../store/actions/users.actions";
import {useNavigate} from "react-router-dom";
import {setLoading} from "../../store/actions";
import UserCart from "./components/UserCart";
import Loading from "../../components/Loading";




function UsersList(props){

    const {message,loading} = useSelector(state => state.settingsReducer);
    const {response, error} = useSelector(state => state.usersReducer);

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

    const handleLogOut = () =>{
        dispatch(setLoading(true));
        localStorage.removeItem("lev_token");
        setTimeout(()=>{
            dispatch(setLoading(false));
            navigate("/")
        },400)
    }


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
        console.log("res", arraySearch(response.data, searchText))
        if(searchText){
            setSearchResults(arraySearch(response.data, searchText))
        }else{
            setSearchResults(null)
        }
    }

    // useEffect(()=>{
    //     handleSearch()
    // },[searchText])

    return(
        <div className="position-absolute d-flex justify-content-center align-items-center h-100 w-100">
            <div className="position-absolute top-0 end-0 mt-4 me-4">
                <button className="btn btn-dark w-100" onClick={handleLogOut}>Logout</button>
            </div>

            {loading ? <span className="position-absolute"><Loading /></span>  : null}


            <div className=" w-75 h-75">
                <div className="h-25">
                    <div className="d-flex justify-content-start top-0 start-0 mt-4 ms-4">
                        <button className="btn btn-dark w-25" onClick={()=>navigate("/users/new")}>Add New User</button>
                    </div>
                    <div className="mt-4 ms-4 d-flex justify-content-start">
                        <input className="w-50 me-4 rounded-1" type="text" placeholder="search" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        <button className="btn btn-dark w-25" onClick={handleSearch}>Search</button>
                    </div>
                </div>

                <div className="ms-4 w-75 h-75 overflow-auto scrollbar scrollbar-secondary"  ref={listInnerRef} onScroll={onScroll}>

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