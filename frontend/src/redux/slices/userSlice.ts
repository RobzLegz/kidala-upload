import { createSlice } from "@reduxjs/toolkit";

export interface User{
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
    cart: any[];
}

interface State{
    loggedIn: boolean,
    token: string,
    info: any,
    loading: boolean,
}

const initialState: State = {
    loggedIn: false,
    token: "",
    info: null,
    loading: true,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.loggedIn = true;
        },
    },
});

export const {
    login,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;