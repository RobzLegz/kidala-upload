import { createSlice } from '@reduxjs/toolkit';

export interface UserInfo {
    loggedIn: boolean;
}

const initialState: UserInfo = {
    loggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleLogin: (state, action) => {
            state = {
                ...state,
                loggedIn: action.payload,
            };

            return state;
        },
    },
});

export const { handleLogin } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
