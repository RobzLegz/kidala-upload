import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { sortFiles } from '../../utils/sortFiles';

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

            const sortedFiles = sortFiles(files);

            state = {
                ...state,
                files: sortedFiles,
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

            const newfiles: FileInterface[] = state.files.map((prod) => {
                if (prod._id === updatedFile._id) {
                    prod = updatedFile;
                }

                return prod;
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
                // const sortedFiles = sortFiles(files);

                state = {
                    ...state,
                    files: files,
                };

                return state;
            }

            const siftFiles = files.map((blog) => {
                if (state.files?.some((b) => b._id === blog._id)) {
                    return null;
                }

                return blog;
            });

            const okFiles = siftFiles.filter((bl) => bl !== null);

            let newFiles: FileInterface[] = [...state.files];

            okFiles.forEach((blog) => {
                if (blog) {
                    newFiles = [...newFiles, blog];
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
    setDbFileLen
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
