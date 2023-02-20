//import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import clickReducer from './click-redux';
import authReducer from './auth-redux';

const store = configureStore({
    reducer: {
        click: clickReducer,
        auth: authReducer
    }
});

export default store;