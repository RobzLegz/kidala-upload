import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { User } from '../../interfaces/user';
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
                const sortedFiles = sortFiles(files);

                state = {
                    ...state,
                    myFiles: sortedFiles,
                };

                return state;
            }

            const siftBlogs = files.map((blog) => {
                if (state.myFiles?.some((b) => b._id === blog._id)) {
                    return null;
                }

                return blog;
            });

            const okBlogs = siftBlogs.filter((bl) => bl !== null);

            let newBlogs: FileInterface[] = [...state.myFiles];

            okBlogs.forEach((blog) => {
                if (blog) {
                    newBlogs = [...newBlogs, blog];
                }
            });

            state = {
                ...state,
                myFiles: newBlogs,
            };

            return state;
        },
    },
});

export const { handleLogin, setUserInfo, setToken, receiveMyFiles } =
    userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
