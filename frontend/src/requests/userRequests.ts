import axios from 'axios';
import { Dispatch } from 'redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { handleLogin, setToken, setUserInfo } from '../redux/slices/userSlice';
import { GET_USER_INFO_ROUTE, LOGIN_ROUTE } from './routes';

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
            Authorization: token,
        },
    };

    await axios
        .get(GET_USER_INFO_ROUTE, headers)
        .then((res) => {
            const { user } = res.data;

            dispatch(setUserInfo(user));
            dispatch(handleLogin(true));
            dispatch(setToken(token));
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
