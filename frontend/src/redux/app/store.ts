import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import appReducer from "../slices/appSlice";
import notificationReducer from "../slices/notificationSlice";
import languageReducer from "../slices/languageSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
        notification: notificationReducer,
        lanugage: languageReducer,
    },
});

export default store;