import {
    ArchiveIcon,
    LoginIcon,
    PhotographIcon,
    PlayIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Button';
import LanguageSelector from '../LanguageSelector';
import Logo from '../Logo';
import UserDropDown from '../UserDropDown';

const HomeNav = () => {
    const router = useRouter();
    const windowSize = useWindowSize();

    if (windowSize.width && windowSize.width < windowSizes.sm) {
        return (
            <nav className="w-full h-16 px-4 flex items-center justify-between absolute top-0 left-0 bg-primary-800 border-b border-primary-700">
                <UserDropDown />

                <div className=""></div>

                <div className="flex items-center justify-center">
                    <Button
                        className="bg-transparent z-10"
                        size="small"
                        color="secondary"
                        onClick={() => router.push('/gallery')}
                    >
                        <p className="text-primary-100">Gallery</p>
                    </Button>

                    <Button
                        className="bg-transparent z-10 ml-1"
                        size="small"
                        color="secondary"
                        onClick={() => router.push('/dropbox')}
                    >
                        <ArchiveIcon className="text-white h-6" />
                    </Button>

                    <Button
                        className="bg-transparent z-10 ml-1"
                        size="small"
                        color="secondary"
                        onClick={() => router.push('/login')}
                    >
                        <p className="text-primary-100">Login</p>
                    </Button>
                </div>
            </nav>
        );
    }

    return (
        <nav className="w-full px-12 h-16 flex items-center justify-between absolute top-0 left-0 bg-primary-800 border-b border-primary-700">
            <button onClick={() => router.push('/')}>
                <Logo />
            </button>

            {/* <div className="flex items-center justify-center z-10">
                <Link href="/gallery">
                    <div className="flex items-center justify-center cursor-pointer">
                        <PhotographIcon className="text-white h-6" />

                        <p className="text-white ml-1">Gallery</p>
                    </div>
                </Link>
            </div> */}

            {/* <UserDropDown /> */}

            <div className="flex items-center justify-center relative">
                <Button
                    className="bg-transparent z-10 ml-1"
                    size="small"
                    color="secondary"
                    onClick={() => router.push('/dropbox')}
                    icon={<ArchiveIcon className="text-white h-6" />}
                >
                    Dropbox
                </Button>

                <Button
                    className="bg-transparent z-10"
                    size="small"
                    color="secondary"
                    onClick={() => router.push('/gallery')}
                >
                    Gallery
                </Button>

                <Button
                    className="bg-transparent z-10"
                    size="small"
                    color="secondary"
                    onClick={() => router.push('/login')}
                >
                    Login
                </Button>

                <LanguageSelector />
            </div>
        </nav>
    );
};

export default HomeNav;
