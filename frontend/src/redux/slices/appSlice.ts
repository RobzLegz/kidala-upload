import { createSlice } from '@reduxjs/toolkit';
import { FileInterface } from '../../interfaces/file';
import { shuffle } from '../../utils/shuffleArray';
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
}

const initialState: AppInfo = {
    files: null,
    previewIdx: null,
    sortOptions: {
        myFiles: false,
        showFiles: false,
        new: false,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setFiles: (state, action) => {
            const files: FileInterface[] = action.payload;

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

            files = [...files].filter((f) => f._id.$oid !== action.payload);

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
    },
});

export const {
    setFiles,
    addNewFile,
    updateFileRdx,
    deleteFileRdx,
    setPreviewIdx,
    setSortOptions,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
