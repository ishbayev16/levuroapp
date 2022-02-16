import { combineReducers } from 'redux';
import settingsReducer from "./settings.reducer";
import usersReducer from "./users.reducer";

const reducers = combineReducers({
    settingsReducer: settingsReducer,
    usersReducer: usersReducer
});

export default reducers;
