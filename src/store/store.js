import { applyMiddleware, combineReducers, compose, createStore } from "redux";

// https://www.npmjs.com/package/redux-thunk
import thunk from 'redux-thunk';

import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { uiReducer } from "../reducers/uiReducer";

// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    notes: notesReducer,
    ui: uiReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);
