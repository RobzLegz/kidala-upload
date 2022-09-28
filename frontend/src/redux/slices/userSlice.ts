import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { Like } from '../../interfaces/like';
import { User } from '../../interfaces/user';
import {
    LikeFileResponse,
    SaveFileResponse,
} from '../../requests/fileRequests';
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
        receiveSavedFiles: (state, action) => {
            const savedFiles: FileInterface[] | null = action.payload;

            if (!savedFiles) {
                return state;
            }

            if (
                !state.savedFiles ||
                state.savedFiles.length === 0 ||
                state.savedFiles === null
            ) {
                state = {
                    ...state,
                    savedFiles: savedFiles,
                };

                return state;
            }

            const siftSavedFiles = savedFiles.map((file) => {
                if (state.savedFiles?.some((b) => b._id === file._id)) {
                    return null;
                }

                return file;
            });

            const okFiles = siftSavedFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.savedFiles];

            okFiles.forEach((file) => {
                if (file) {
                    newFiles = [...newFiles, file];
                }
            });

            state = {
                ...state,
                savedFiles: newFiles,
            };

            return state;
        },
        saveFileUserHandlerRdx: (
            state,
            action: {
                type: string;
                payload: SaveFileResponse;
            }
        ) => {
            if (!state.info) {
                return state;
            }

            const resp: SaveFileResponse = {
                ...action.payload,
            };

            const { file_id, saved } = resp;

            let newInfo: User = {
                ...state.info,
            };

            if (saved) {
                newInfo = {
                    ...newInfo,
                    favourites: [
                        ...newInfo.favourites.filter((fav) => fav !== file_id),
                        file_id,
                    ],
                };
            } else {
                newInfo = {
                    ...newInfo,
                    favourites: [
                        ...newInfo.favourites.filter((fav) => fav !== file_id),
                    ],
                };
            }

            state = {
                ...state,
                info: { ...newInfo },
            };

            return state;
        },
        receiveLikedFiles: (state, action) => {
            const likedFiles: FileInterface[] | null = action.payload;

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
    receiveLikedFiles,
    saveFileUserHandlerRdx,
    receiveSavedFiles,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
