import axios from 'axios';
import { Dispatch } from 'redux';
import { FileInterface } from '../interfaces/file';
import { Like } from '../interfaces/like';
import { likeFileRdx, receiveFiles, setFiles } from '../redux/slices/appSlice';
import { setNotification } from '../redux/slices/notificationSlice';
import {
    receiveLikedFiles,
    receiveSavedFiles,
    saveFileUserHandlerRdx,
} from '../redux/slices/userSlice';
import {
    LIST_FILES_ROUTE,
    LIKE_FILE_ROUTE,
    GET_USER_LIKED_FILES,
    FAVOURITE_FILE_ROUTE,
    GET_USER_FAVOURITED_FILES,
} from './routes';

export interface ListFilesResponse {
    count?: number;
    cursor?: number;
    files?: FileInterface[];
    total_db?: number;
}

export interface LikeFileResponse {
    likeObj: Like;
    msg: string;
}

export interface SaveFileResponse {
    file_id: string;
    saved: boolean;
    msg: string;
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
            const data: LikeFileResponse = res.data;

            dispatch(likeFileRdx(data.likeObj));
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

export const saveFile = async ({
    file_id,
    dispatch,
    token,
}: {
    file_id?: string;
    dispatch: Dispatch;
    token: string;
}) => {
    const body = {
        file_id: file_id,
    };

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .post(FAVOURITE_FILE_ROUTE, body, headers)
        .then((res) => {
            const data: SaveFileResponse = res.data;

            dispatch(saveFileUserHandlerRdx(data));
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

export const getLiked = async ({
    cursor,
    limit,
    dispatch,
    token,
}: {
    cursor: number;
    limit: number;
    dispatch: Dispatch;
    token: string;
}) => {
    const route = `${GET_USER_LIKED_FILES}?cursor=${cursor}&limit=${limit}`;

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .get(route, headers)
        .then((res) => {
            const data: ListFilesResponse = res.data;

            dispatch(receiveLikedFiles(data.files));
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

export const getSaved = async ({
    cursor,
    limit,
    dispatch,
    token,
}: {
    cursor: number;
    limit: number;
    dispatch: Dispatch;
    token: string;
}) => {
    const route = `${GET_USER_FAVOURITED_FILES}?cursor=${cursor}&limit=${limit}`;

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    await axios
        .get(route, headers)
        .then((res) => {
            const data: ListFilesResponse = res.data;

            dispatch(receiveSavedFiles(data.files));
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
