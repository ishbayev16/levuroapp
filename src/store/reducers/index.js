import { combineReducers } from 'redux';
import settingsReducer from "./settings.reducer";


const reducers = combineReducers({
    settingsReducer: settingsReducer
});

export default reducers;
