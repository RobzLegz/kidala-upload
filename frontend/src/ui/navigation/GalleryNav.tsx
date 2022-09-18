import { ArchiveBoxIcon, Bars3CenterLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React from 'react';
import LanguageSelector from '../LanguageSelector';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Button';
import Logo from '../Logo';
import UserDropDown from '../UserDropDown';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

const HomeNav = () => {
    const router = useRouter();
    const windowSize = useWindowSize();

    const languageInfo: LanguageInfo = useSelector(selectLanguage);
    const userInfo: UserInfo = useSelector(selectUser);

    if (windowSize.width && windowSize.width < windowSizes.sm) {
        return (
            <nav className="w-full h-16 px-4 flex items-center justify-between absolute top-0 left-0 bg-primary-800 border-b border-primary-700">
                <UserDropDown
                    icon={
                        !userInfo.loggedIn && (
                            <Bars3CenterLeftIcon className="text-white h-6" />
                        )
                    }
                />

                <div className=""></div>

                <div className="flex items-center justify-center">
                    <Button
                        className="bg-transparent z-10"
                        size="small"
                        color="secondary"
                        onClick={() => router.push('/gallery')}
                    >
                        Gallery
                    </Button>

                    <Button
                        className="bg-transparent z-10 ml-1"
                        size="small"
                        color="secondary"
                        onClick={() => router.push('/new/dropbox')}
                        icon={<ArchiveBoxIcon className="text-white h-6" />}
                    >
                        Dropbox
                    </Button>

                    {!userInfo.loggedIn && (
                        <Button
                            className="bg-transparent z-10 ml-1"
                            size="small"
                            color="secondary"
                            onClick={() => router.push('/new/login')}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full px-6 lg:px-12 h-16 flex items-center justify-between absolute top-0 left-0 bg-primary-800 border-b border-primary-700">
            <button onClick={() => router.push('/new')}>
                <Logo />
            </button>

            <div className="flex items-center justify-center relative">
                <Button
                    className="bg-transparent z-10"
                    size="small"
                    color="secondary"
                    onClick={() => router.push('/gallery')}
                >
                    Gallery
                </Button>

                <Button
                    className="bg-transparent z-10 ml-1"
                    size="small"
                    color="secondary"
                    onClick={() => router.push('/dropbox')}
                    icon={<ArchiveBoxIcon className="text-white h-6" />}
                >
                    Dropbox
                </Button>

                {!userInfo.loggedIn && (
                    <>
                        <Button
                            className="bg-transparent z-10"
                            size="small"
                            color="secondary"
                            onClick={() => router.push('/login')}
                        >
                            My files
                        </Button>

                        <Button
                            className="bg-transparent z-10"
                            size="small"
                            color="secondary"
                            onClick={() => router.push('/login')}
                        >
                            Login
                        </Button>
                    </>
                )}

                <LanguageSelector />

                {userInfo.loggedIn && (
                    <div className="ml-1">
                        <UserDropDown />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default HomeNav;
