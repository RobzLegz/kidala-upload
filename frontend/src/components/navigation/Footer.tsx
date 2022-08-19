import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

function Footer() {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <footer className="w-full py-8 flex items-center justify-center">
            {router.asPath !== '/' ? (
                <Link href="/">
                    <p className="link mx-2">Home</p>
                </Link>
            ) : null}

            {!router.pathname.includes('gallery') ? (
                <Link href="/gallery">
                    <p className="link mx-2">Gallery</p>
                </Link>
            ) : null}

            {userInfo.info && !router.pathname.includes('my-files') ? (
                <Link href="/my-files">
                    <p className="link mx-2">My files</p>
                </Link>
            ) : null}
        </footer>
    );
}

export default Footer;
