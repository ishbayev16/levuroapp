import * as Actions from "../actions/users.actions";

const initialState = {
    response: {data: []},
    singleUser: null,
    singleUserError: null,
    error: false
};

const usersReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.FETCH_USERS_LIST_SUCCESS:
        {
            return {
                ...state,
                response: {
                    ...action.payload.response,
                    data: [...state?.response?.data, ...action.payload.response.data]
                },
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
        case Actions.FETCH_USER_SUCCESS:
        {
            return {
                ...state,
                singleUser: action.payload.response,
                singleUserError: true
            };
        }
        case Actions.FETCH_USER_ERROR:
        {
            return {
                ...state,
                singleUser: null,
                singleUserError: true
            };
        }
        case Actions.SET_EMPTY_USER:
        {
            return {
                ...state,
                singleUser: action.payload,
                singleUserError: false
            };
        }
        default:
        {
            return state;
        }
    }
};

export default usersReducer;