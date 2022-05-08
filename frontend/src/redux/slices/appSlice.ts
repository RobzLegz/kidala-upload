import { createSlice } from "@reduxjs/toolkit";

export interface Product{
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sold: number;
    category: string;
    images: string[];
}

interface State{
    products: Product[] | null;
}

const initialState: State = {
    products: null
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        
    },
});

export const {

} = appSlice.actions;

export const selectApp = (state: any) => state.app;

export default appSlice.reducer;