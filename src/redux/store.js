import {compose, createStore} from "redux";
import todoApp from "./reducers";

export const store = createStore(todoApp, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));