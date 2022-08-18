import axios from 'axios';
import { Dispatch } from 'redux';
import { deleteFileRdx, setFiles } from '../redux/slices/appSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import { ADMIN_DELETE, ADMIN_LIST_FILES } from './routes';

export const getAllFiles = async (dispatch: Dispatch) => {
    await axios
        .get(ADMIN_LIST_FILES)
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

    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
        return dispatch(
            setNotification({
                type: 'error',
                message: 'Invalid access_token',
            })
        );
    }

    const headers = {
        headers: {
            Authorization: access_token,
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
