import axios from 'axios';
import React from 'react';
import { Dispatch } from 'redux';
import { FileInterface } from '../interfaces/file';
import { addNewFile } from '../redux/slices/appSlice';
import { clearNotification } from '../redux/slices/notificationSlice';
import { receiveMyFiles, setToken } from '../redux/slices/userSlice';
import { UPLOAD_ROUTE } from './routes';

export const uploadFile = async (
    setUrl: React.Dispatch<React.SetStateAction<string>>,
    dispatch: Dispatch,
    file: File | null,
    tags: string[],
    description: string,
    isPrivate: boolean
) => {
    if (!file) {
        return;
    }

    let file_tags = '';

    tags.forEach((tag) => {
        if (file_tags === '') {
            file_tags = tag;
        } else {
            file_tags = `${file_tags};${tag}`;
        }
    });

    let formData = new FormData();
    formData.append('file', file);
    formData.append('tag', file_tags);
    formData.append('description', description);
    formData.append('private', isPrivate.toString());

    let headers: { headers: Record<string, any> } = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        headers = {
            ...headers,
            headers: {
                ...headers.headers,
                Authorization: `Bearer ${access_token}`,
            },
        };
    }

    await axios
        .post(UPLOAD_ROUTE, formData, headers)
        .then((res) => {
            const { token, hash, url, file } = res.data;

            if (token) {
                localStorage.setItem('access_token', token);

                dispatch(setToken(token));
            }

            dispatch(receiveMyFiles([file]));
            setUrl(file.hash);
            dispatch(addNewFile(file));
            dispatch(clearNotification());
        })
        .catch((err) => {
            if (!err.response) {
                return console.log(err);
            }

            if (!err.response.data) {
                return console.log(err);
            }

            console.log(err.response.data);
        });
};

export const uploadProfileFile = async (
    file: File | null,
    description: string,
    token: string
) => {
    if (!file) {
        return;
    }

    let formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);
    formData.append('private', 'true');

    let headers: { headers: Record<string, any> } = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.post(UPLOAD_ROUTE, formData, headers);

    return res;
};
