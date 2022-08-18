import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user';

export interface UserInfo {
    loggedIn: boolean;
    info: User | null;
    token: string;
}

const initialState: UserInfo = {
    loggedIn: false,
    info: null,
    token: '',
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
        setUserInfo: (state, action) => {
            state = {
                ...state,
                info: action.payload,
            };

            return state;
        },
        setToken: (state, action) => {
            state = {
                ...state,
                token: action.payload,
            };

            return state;
        },
    },
});

export const { handleLogin, setUserInfo, setToken } = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
