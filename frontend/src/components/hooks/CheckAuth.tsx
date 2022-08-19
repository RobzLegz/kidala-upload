import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getUserInfo } from '../../requests/userRequests';

export const CheckAuth: React.FC = () => {
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            if (!userInfo.info) {
                getUserInfo(access_token, dispatch);
            }
        }
    }, []);

    return null;
};

export default CheckAuth;
