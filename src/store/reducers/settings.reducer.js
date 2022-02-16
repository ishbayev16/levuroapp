import * as Actions from "../actions/settings.actions";

const initialState = {
    loading: false,
    message: null
};

const settingsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_LOADING:
        {
            return {
                ...state,
                loading: action.payload.loading
            };
        }
        case Actions.SET_MESSAGE:
        {
            return {
                ...state,
                message: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default settingsReducer;