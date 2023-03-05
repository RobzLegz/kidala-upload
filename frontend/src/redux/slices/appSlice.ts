import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { Like } from '../../interfaces/like';
import { User } from '../../interfaces/user';
import { LikeFileResponse } from '../../requests/fileRequests';

export interface SortOptions {
    myFiles: boolean;
    showFiles: boolean;
    new: boolean;
}

export interface AppInfo {
    files: FileInterface[] | null;
    previewIdx: number | null;
    sortOptions: SortOptions;
    audioVolume: number;
    db_file_len: number;
    collectedUsers: User[];
}

const initialState: AppInfo = {
    files: null,
    previewIdx: null,
    sortOptions: {
        myFiles: false,
        showFiles: false,
        new: false,
    },
    audioVolume: 1,
    db_file_len: 0,
    collectedUsers: [],
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            const files: FileInterface[] | null = action.payload;

            if (!files) {
                return state;
            }

            state = {
                ...state,
                files,
            };

            return state;
        },
        deleteFileRdx: (state, action) => {
            let files: FileInterface[] = [];

            if (state.files) {
                files = state.files;
            }

            files = [...files].filter((f) => f._id !== action.payload);

            state = {
                ...state,
                files: files,
            };

            return state;
        },
        addNewFile: (state, action) => {
            let files: FileInterface[] = [];

            if (state.files) {
                files = state.files;

                const newFiles = [...files, action.payload];

                state = {
                    ...state,
                    files: newFiles,
                };
            }

            return state;
        },
        updateFileRdx: (state, action) => {
            const updatedFile: FileInterface = action.payload;

            if (!state.files) {
                return state;
            }

            const newfiles: FileInterface[] = state.files.map((fileQ) => {
                if (fileQ._id === updatedFile._id) {
                    fileQ = updatedFile;
                }

                return fileQ;
            });

            state = {
                ...state,
                files: newfiles,
            };

            return state;
        },
        likeFileRdx: (
            state,
            action: { type: string; payload: LikeFileResponse['likeObj'] }
        ) => {
            if (!state.files) {
                return state;
            }

            const newLike: Like = {
                ...action.payload,
            };

            const newfiles: FileInterface[] = state.files.map((fileQ) => {
                if (fileQ._id === action.payload.file_id) {
                    fileQ = {
                        ...fileQ,
                        likes: [
                            ...fileQ.likes.filter(
                                (l) => l.user_id !== newLike.user_id
                            ),
                            newLike,
                        ],
                    };
                }

                return fileQ;
            });

            state = {
                ...state,
                files: newfiles,
            };

            return state;
        },
        setPreviewIdx: (state, action) => {
            state = {
                ...state,
                previewIdx: action.payload,
            };

            return state;
        },
        setSortOptions: (state, action) => {
            state = {
                ...state,
                sortOptions: {
                    ...action.payload,
                },
            };

            return state;
        },
        setAudioVolume: (state, action) => {
            state = {
                ...state,
                audioVolume: Number(action.payload),
            };

            return state;
        },
        receiveFiles: (state, action) => {
            const files: FileInterface[] | null = action.payload;

            if (!files) {
                return state;
            }

            if (
                !state.files ||
                state.files.length === 0 ||
                state.files === null
            ) {
                state = {
                    ...state,
                    files: files,
                };

                return state;
            }

            const siftFiles = files.map((file) => {
                if (state.files?.some((b) => b._id === file._id)) {
                    return null;
                }

                return file;
            });

            const okFiles = siftFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.files];

            okFiles.forEach((file) => {
                if (file) {
                    newFiles = [...newFiles, file];
                }
            });

            state = {
                ...state,
                files: newFiles,
            };

            return state;
        },
        setDbFileLen: (state, action) => {
            state = {
                ...state,
                db_file_len: action.payload,
            };

            return state;
        },
        getUserFromFileRdx: (state, action) => {
            const collectedUsers: User[] | null = action.payload;

            if (!collectedUsers) {
                return state;
            }

            if (
                !state.collectedUsers ||
                state.collectedUsers.length === 0
            ) {
                state = {
                    ...state,
                    collectedUsers: collectedUsers,
                };

                return state;
            }

            const siftUsers = collectedUsers.map((user) => {
                if (state.collectedUsers?.some((b) => b._id === user._id)) {
                    return null;
                }

                return user;
            });

            const okUsers = siftUsers.filter((bl) => bl !== null);

            let newUsers: User[] = [...state.collectedUsers];

            okUsers.forEach((file) => {
                if (file) {
                    newUsers = [...newUsers, file];
                }
            });

            state = {
                ...state,
                collectedUsers: newUsers,
            };

            return state;
        },
    },
});

export const {
    setFiles,
    addNewFile,
    updateFileRdx,
    deleteFileRdx,
    setPreviewIdx,
    setSortOptions,
    setAudioVolume,
    receiveFiles,
    setDbFileLen,
    likeFileRdx,
    getUserFromFileRdx,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
