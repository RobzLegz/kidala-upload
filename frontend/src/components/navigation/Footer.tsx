import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getUserInfo } from '../../requests/userRequests';

function Footer() {
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

    return (
        <footer className="w-full py-8 flex items-center justify-center">
            <Link href="/">
                <p className="link mx-2">Home</p>
            </Link>

            <Link href="/gallery">
                <p className="link mx-2">Gallery</p>
            </Link>
        </footer>
    );
}

export default Footer;
