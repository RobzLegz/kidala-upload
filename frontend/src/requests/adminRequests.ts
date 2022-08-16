import axios from 'axios';
import { Dispatch } from 'redux';
import { deleteFileRdx, setFiles } from '../redux/slices/appSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import { ADMIN_DELETE, ADMIN_LIST_FILES } from './routes';

export const getAllFiles = async (dispatch: Dispatch) => {
    const { NEXT_PUBLIC_ACCESS_TOKEN } = process.env;

    const headers = {
        headers: {
            'x-access-token': String(NEXT_PUBLIC_ACCESS_TOKEN),
        },
    };

    await axios
        .get(ADMIN_LIST_FILES, headers)
        .then((res) => {
            dispatch(setFiles(res.data));
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

export const deleteFile = async (id: string, dispatch: Dispatch) => {
    const data = {
        objectid: id,
    };

    const { NEXT_PUBLIC_ACCESS_TOKEN } = process.env;

    const headers = {
        headers: {
            'x-access-token': String(NEXT_PUBLIC_ACCESS_TOKEN),
        },
    };

    await axios
        .post(ADMIN_DELETE, data, headers)
        .then((res) => {
            dispatch(deleteFileRdx(id));
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
