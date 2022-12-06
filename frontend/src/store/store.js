import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { callReducer } from './reducers/callReducer';
import { userReducer } from './reducers/userReducer';

// initial states
const initalState = {};

// reducer
const reducer = combineReducers({
    user: userReducer,
    call: callReducer
});

// creating store
export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
        serializableCheck: false
    })],
    //We have written middleware this way so that we can ad more middlewares here in future .
    initalState
});