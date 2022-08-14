import { createSlice } from "@reduxjs/toolkit";
import { FileInterface } from "../../interfaces/file";
import { shuffle } from "../../utils/shuffleArray";

export interface AppInfo {
    files: FileInterface[] | null;
}

const initialState: AppInfo = {
    files: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setFiles: (state, action) => {
            state = {
                ...state,
                files: shuffle(action.payload),
            };

            return state;
        },
        addNewFile: (state, action) => {
            let prods: FileInterface[] = [];

            if (state.files) {
                prods = state.files;
            }

            state = {
                ...state,
                files: [...prods, action.payload],
            };

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
    },
});

export const {
    setFiles,
    addNewFile,
    updateFileRdx,
} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;
