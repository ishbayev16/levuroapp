import './App.css';
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./store/reducers";
import thunk from "redux-thunk";
import {Provider} from "react-redux";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
