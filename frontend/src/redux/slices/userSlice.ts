import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { Like } from '../../interfaces/like';
import { User } from '../../interfaces/user';
import { LikeFileResponse } from '../../requests/fileRequests';
import { AuthResponse } from '../../requests/userRequests';
import { sortFiles } from '../../utils/sortFiles';

export interface UserInfo {
    myFiles: FileInterface[] | null;
    loggedIn: boolean;
    info: User | null;
    token: string;
    likedFiles: FileInterface[] | null;
    savedFiles: FileInterface[] | null;
}

const initialState: UserInfo = {
    myFiles: null,
    loggedIn: false,
    info: null,
    token: '',
    likedFiles: null,
    savedFiles: null,
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

            const siftFiles = files.map((file) => {
                if (state.myFiles?.some((b) => b._id === file._id)) {
                    return null;
                }

                return file;
            });

            const okFiles = siftFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.myFiles];

            okFiles.forEach((file) => {
                if (file) {
                    newFiles = [...newFiles, file];
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
                info: { ...user },
                loggedIn: true,
            };

            return state;
        },
        likeFileUserHandlerRdx: (
            state,
            action: { type: string; payload: LikeFileResponse['likeObj'] }
        ) => {
            if (!state.info) {
                return state;
            }

            const newLike: Like = {
                ...action.payload,
            };

            state = {
                ...state,
                info: {
                    ...state.info,
                    likes: [
                        ...state.info.likes.filter(
                            (l) => l.file_id !== newLike.file_id
                        ),
                        newLike,
                    ],
                },
            };

            return state;
        },
        receiveLikedFiles: (state, action) => {
            const likedFiles: FileInterface[] | null = action.payload;

            console.log(likedFiles)

            if (!likedFiles) {
                return state;
            }

            if (
                !state.likedFiles ||
                state.likedFiles.length === 0 ||
                state.likedFiles === null
            ) {
                state = {
                    ...state,
                    likedFiles: likedFiles,
                };

                return state;
            }

            const siftLikedFiles = likedFiles.map((file) => {
                if (state.likedFiles?.some((b) => b._id === file._id)) {
                    return null;
                }

                return file;
            });

            const okFiles = siftLikedFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.likedFiles];

            okFiles.forEach((file) => {
                if (file) {
                    newFiles = [...newFiles, file];
                }
            });

            state = {
                ...state,
                likedFiles: newFiles,
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
    receiveLikedFiles
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
