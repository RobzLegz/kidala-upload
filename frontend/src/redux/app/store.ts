import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import appReducer from "../slices/appSlice";
import notificationReducer from "../slices/notificationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
        notification: notificationReducer
    },
});

export default store;