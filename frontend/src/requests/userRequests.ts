import axios from 'axios';
import { Dispatch } from 'redux';
import { User } from '../interfaces/user';
import { setNotification } from '../redux/slices/notificationSlice';
import {
    handleLogin,
    receiveMyFiles,
    setToken,
    setUserInfo,
} from '../redux/slices/userSlice';
import { ListFilesResponse } from './fileRequests';
import {
    GET_USER_INFO_ROUTE,
    GET_USER_ITEMS_ROUTE,
    LOGIN_ROUTE,
} from './routes';

export const loginUser = async (
    username: string,
    password: string,
    dispatch: Dispatch
) => {
    const data = {
        username,
        password,
    };

    await axios
        .post(LOGIN_ROUTE, data)
        .then((res) => {
            const { access_token, info } = res.data;

            dispatch(setUserInfo(info));
            dispatch(setToken(access_token));

            localStorage.setItem('access_token', access_token);

            dispatch(handleLogin(true));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};

export const getUserInfo = async (token: string, dispatch: Dispatch) => {
    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .get(GET_USER_INFO_ROUTE, headers)
        .then((res) => {
            dispatch(setUserInfo(res.data));
            dispatch(setToken(token));

            if (res.data.username && res.data.password) {
                dispatch(handleLogin(true));
            }
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};

export const getUserFiles = async ({
    token,
    cursor,
    limit,
    dispatch,
}: {
    token: string;
    cursor: number;
    limit: number;
    dispatch: Dispatch;
}) => {
    const route = `${GET_USER_ITEMS_ROUTE}?cursor=${cursor}&limit=${limit}`;

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .get(route, headers)
        .then((res) => {
            const data: ListFilesResponse = res.data;

            dispatch(receiveMyFiles(data.files));
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            const message: string = err.response.data.err;
            dispatch(
                setNotification({
                    type: 'error',
                    message: message,
                })
            );
        });
};
