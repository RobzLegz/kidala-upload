import axios from 'axios';
import { NextRouter } from 'next/router';
import { Dispatch } from 'redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { LOGIN_ROUTE } from './routes';

export const loginUser = async (
    username: string,
    password: string,
    dispatch: Dispatch,
    router: NextRouter
) => {
    const data = {
        username,
        password,
    };

    await axios
        .post(LOGIN_ROUTE)
        .then((res) => {
            console.log(res.data);
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
