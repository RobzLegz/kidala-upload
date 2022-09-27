import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { User } from '../../interfaces/user';
import { AuthResponse } from '../../requests/userRequests';
import { sortFiles } from '../../utils/sortFiles';

export interface UserInfo {
    myFiles: FileInterface[] | null;
    loggedIn: boolean;
    info: User | null;
    token: string;
}

const initialState: UserInfo = {
    myFiles: null,
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
        receiveMyFiles: (state, action) => {
            const files: FileInterface[] | null = action.payload;

            if (!files) {
                return state;
            }

            if (
                !state.myFiles ||
                state.myFiles.length === 0 ||
                state.myFiles === null
            ) {
                state = {
                    ...state,
                    myFiles: files,
                };

                return state;
            }

            const siftFiles = files.map((blog) => {
                if (state.myFiles?.some((b) => b._id === blog._id)) {
                    return null;
                }

                return blog;
            });

            const okFiles = siftFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.myFiles];

            okFiles.forEach((blog) => {
                if (blog) {
                    newFiles = [...newFiles, blog];
                }
            });

            state = {
                ...state,
                myFiles: newFiles,
            };

            return state;
        },
        authHandler: (
            state,
            action: { type: string; payload: AuthResponse }
        ) => {
            const { token, user } = action.payload;

            state = {
                ...state,
                token: token ? token : '',
                info: user,
                loggedIn: true,
            };

            return state;
        },
    },
});

export const {
    handleLogin,
    setUserInfo,
    setToken,
    receiveMyFiles,
    authHandler,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
