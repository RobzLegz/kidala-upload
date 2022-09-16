import { useRouter } from 'next/router';
import React from 'react';
import Logo from '../Logo';
import UserDropDown from '../UserDropDown';

const HomeNav = () => {
    const router = useRouter();

    return (
        <nav className="w-full px-48 py-4 flex items-center justify-between">
            <button onClick={() => router.push('/')}>
                <Logo />
            </button>

            <UserDropDown />
        </nav>
    );
};

export default HomeNav;
