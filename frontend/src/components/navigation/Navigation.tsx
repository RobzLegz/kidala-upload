import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

function Navigation() {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);
    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    return (
        <nav className="w-full py-2 flex items-center justify-start">
            {router.asPath !== '/' ? (
                <Link href="/">
                    <p className="link mx-2">
                        {languageInfo.text.navigation.home}
                    </p>
                </Link>
            ) : null}

            {!router.pathname.includes('gallery') ? (
                <Link href="/gallery">
                    <p className="link mx-2">
                        {languageInfo.text.navigation.gallery}
                    </p>
                </Link>
            ) : null}

            {userInfo.info && !router.pathname.includes('my-files') ? (
                <Link href="/my-files">
                    <p className="link mx-2">
                        {languageInfo.text.navigation.myFiles}
                    </p>
                </Link>
            ) : null}
        </nav>
    );
}

export default Navigation;
