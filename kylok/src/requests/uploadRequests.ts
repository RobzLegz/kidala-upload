import axios from 'axios';
import React from 'react';
import { Dispatch } from 'redux';
import { addNewFile } from '../redux/slices/appSlice';
import { clearNotification } from '../redux/slices/notificationSlice';
import { setToken } from '../redux/slices/userSlice';
import { UPLOAD_BASE } from './routes';

export const uploadFile = async (
    setUrl: React.Dispatch<React.SetStateAction<string>>,
    dispatch: Dispatch,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    file: File | null,
    tag: string,
    description: string,
    isPrivate: boolean,
) => {
    if (!file) {
        return;
    }

    let formData = new FormData();
    formData.append('file', file);
    formData.append('tag', tag);
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
                Authorization: access_token,
            },
        };
    }

    await axios
        .post(UPLOAD_BASE, formData, headers)
        .then((res) => {
            const { access_token, hash, url, file } = res.data;

            if (access_token) {
                localStorage.setItem('access_token', access_token);

                dispatch(setToken(access_token));
            }

            setUrl(hash);
            dispatch(addNewFile(file));
            dispatch(clearNotification());
            setFile(null);
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
