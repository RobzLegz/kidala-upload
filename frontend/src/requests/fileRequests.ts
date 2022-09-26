import axios from 'axios';
import { Dispatch } from 'redux';
import { FileInterface } from '../interfaces/file';
import { receiveFiles, setFiles } from '../redux/slices/appSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import { LIST_FILES_ROUTE, LIKE_FILE_ROUTE } from './routes';

export interface ListFilesResponse {
    count?: number;
    cursor?: number;
    files?: FileInterface[];
    total_db?: number;
}

export const getAllFiles = async (dispatch: Dispatch) => {
    await axios
        .get(LIST_FILES_ROUTE)
        .then((res) => {
            dispatch(setFiles(res.data.files));
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

export const getFilesV2 = async ({
    cursor,
    limit,
    dispatch,
}: {
    cursor: number;
    limit: number;
    dispatch: Dispatch;
}) => {
    const route = `${LIST_FILES_ROUTE}?cursor=${cursor}&limit=${limit}`;

    await axios
        .get(route)
        .then((res) => {
            const data: ListFilesResponse = res.data;

            dispatch(receiveFiles(data.files));
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

export const likeFile = async ({
    user_id,
    file_id,
    count,
    dispatch,
    token,
}: {
    user_id?: string;
    file_id?: string;
    count: number;
    dispatch: Dispatch;
    token: string;
}) => {
    const body = {
        user_id: user_id,
        file_id: file_id,
        count: count,
    };

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .post(LIKE_FILE_ROUTE, body, headers)
        .then((res) => {
            console.log(res.data);

            // const data: ListFilesResponse = res.data;

            // dispatch(receiveFiles(data.files));
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
