import * as Actions from "../actions/users.actions";

const initialState = {
    response: {data: []},
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
                // response: action.payload.response,
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