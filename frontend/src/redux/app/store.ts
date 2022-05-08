import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import appReducer from "../slices/appSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer
    },
});

export default store;