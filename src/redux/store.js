import { configureStore } from '@reduxjs/toolkit';
import langReducer from './slices/langSlice';
import loginReducer from './slices/loginSlice';
import appReducer from './slices/appSlice';
import logoutReducer from './slices/logoutSlice';
import loadingReducer from './slices/loadingSlice';
import authReducer from './slices/authSlice';
import leftMenuReducer from './slices/leftMenuSlice';
import jobAndHoldReducer from './slices/jobAndHoldSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        jobAndHold: jobAndHoldReducer,
        lang: langReducer,
        leftMenu: leftMenuReducer,
        login: loginReducer,
        loading: loadingReducer,
        logout: logoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production',
});