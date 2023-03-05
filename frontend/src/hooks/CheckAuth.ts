import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import { getUserInfo } from '../requests/userRequests';

export const CheckAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            if (!userInfo.info) {
                getUserInfo(access_token, dispatch, router);
            }
        } else {
            if (router.pathname === '/new/profile') {
                router.replace('/new');
            }
        }
    }, []);

    return null;
};

export default CheckAuth;
