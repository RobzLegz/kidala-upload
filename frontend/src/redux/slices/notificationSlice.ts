import { createSlice } from '@reduxjs/toolkit';

export interface NotificationInfo {
    type: null | 'success' | 'error' | 'popup' | 'loading';
    message: null | string;
    fun: null | 'DELETE_CATEGORY';
    params: null | string;
}

const initialState: NotificationInfo = {
    type: null,
    message: null,
    fun: null,
    params: null,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            const {
                type,
                message,
                fun,
                params,
            }: {
                type: 'success' | 'error' | 'popup' | 'loading';
                message: string;
                fun?: 'DELETE_CATEGORY';
                params?: string;
            } = action.payload;

            state = {
                ...state,
                type,
                message,
                fun: fun ? fun : null,
                params: params ? params : null,
            };

            return state;
        },
        clearNotification: (state) => {
            state.type = null;
            state.message = null;
            state.fun = null;
        },
    },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const selectNotification = (state: any) => state.notification;

export default notificationSlice.reducer;
