import * as Actions from "../actions/users.actions";
import {FETCH_USERS_LIST_ERROR, FETCH_USERS_LIST_SUCCESS} from "../actions/users.actions";

const initialState = {
    response: null,
    error: false
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.FETCH_USERS_LIST_SUCCESS:
        {
            return {
                ...state,
                response: action.payload.data,
                error: false,
            };
        }
        case Actions.FETCH_USERS_LIST_ERROR:
        {
            return {
                ...state,
                response: null,
                error: true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default usersReducer;