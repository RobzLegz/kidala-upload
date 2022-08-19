import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

function Footer() {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <footer className="w-full py-8 flex items-center justify-center">
            <Link href="/">
                <p className="link mx-2">Home</p>
            </Link>

            <Link href="/gallery">
                <p className="link mx-2">Gallery</p>
            </Link>

            {userInfo.info ? (
                <Link href="/my-files">
                    <p className="link mx-2">My files</p>
                </Link>
            ) : null}
        </footer>
    );
}

export default Footer;
