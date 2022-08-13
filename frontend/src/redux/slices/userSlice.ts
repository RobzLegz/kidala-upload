import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../interfaces/product';
import { User } from '../../interfaces/user';

export interface UserInfo {
    loggedIn: boolean;
    info: User | null;
    cart: string[];
}

const initialState: UserInfo = {
    loggedIn: false,
    info: null,
    cart: [],
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
        setCart: (state, action) => {
            if (state.info) {
                state = {
                    ...state,
                    info: {
                        ...state.info,
                        cart: action.payload,
                    },
                };
            }

            state = {
                ...state,
                cart: action.payload,
            };

            return state;
        },
        addToCartRdx: (state, action) => {
            if (!state.info) {
                return state;
            }

            let newCart: string[] = [];

            if (state.cart) {
                newCart = state.cart;
            }

            state = {
                ...state,
                cart: [...newCart, action.payload],
            };

            return state;
        },
        removeFromCartRdx: (state, action) => {
            if (!state.info) {
                return state;
            }

            let newCart: string[] = [];

            let productRemoved = false;

            state.cart.forEach((item: string) => {
                if (item !== action.payload || productRemoved) {
                    newCart = [...newCart, item];
                } else if (!productRemoved) {
                    productRemoved = true;
                }
            });

            state = {
                ...state,
                cart: newCart,
            };

            return state;
        },
    },
});

export const {
    handleLogin,
    setUserInfo,
    addToCartRdx,
    removeFromCartRdx,
    setCart,
} = userSlice.actions;

export const selectUser = (state: any) => state.user;

export default userSlice.reducer;
