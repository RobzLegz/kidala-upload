import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../Button';

const SettingsSidebar = () => {
    const router = useRouter();
    const windowSize = useWindowSize();

    const { page } = router.query;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!page) {
            router.push(
                {
                    pathname: '/settings',
                    query: { page: 'profile' },
                },
                undefined,
                { shallow: true }
            );
        }

        if (windowSize.width && windowSize.width < windowSizes.md && open) {
            setOpen(false);
        }
    }, [page]);

    useEffect(() => {
        if (windowSize.width && windowSize.width >= windowSizes.md) {
            setOpen(true);
        } else {
            // setOpen(false);
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (windowSize.width && windowSize.width < windowSizes.md && open) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [windowSize.width, open]);

    return (
        <div className="flex flex-col h-full md:w-52 lg:w-60 px-0 md:px-2 md:fixed left-6 lg:left-12 top-0 z-10">
            <Button
                color="primary-300"
                size="small"
                className="flex md:hidden w-10 h-8 absolute top-24 left-2"
                onClick={() => setOpen(true)}
            >
                <Bars3BottomLeftIcon className="text-primary-100 h-6" />
            </Button>

            <ul
                className={`absolute left-0 lg:relative bg-primary-900 h-full w-full max-w-[400px] lg:w-60 top-24 flex flex-col transition-transform duration-500 px-2 ${
                    open ? '' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div className="w-full flex items-start justify-end">
                    <Button
                        color="primary-300"
                        size="small"
                        className="flex md:hidden w-10 h-8"
                        onClick={() => setOpen(false)}
                    >
                        <XMarkIcon className="text-primary-100 h-6" />
                    </Button>
                </div>

                <li>
                    <strong className="text-primary-300">USER SETTINGS</strong>
                </li>

                <li className="w-full mt-2">
                    <button
                        className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                            page === 'profile' ? 'bg-primary-800' : ''
                        }`}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: '/settings',
                                    query: { page: 'profile' },
                                },
                                undefined,
                                { shallow: true }
                            )
                        }
                    >
                        Profile
                    </button>
                </li>
                {/* 
                <li className="w-full mt-2">
                    <button
                        className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                            page === 'account' ? 'bg-primary-800' : ''
                        }`}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: '/settings',
                                    query: { page: 'account' },
                                },
                                undefined,
                                { shallow: true }
                            )
                        }
                    >
                        Account
                    </button>
                </li> */}

                {/* <li className="w-full mt-2">
                    <button
                        className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                            page === 'security-and-privacy'
                                ? 'bg-primary-800'
                                : ''
                        }`}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: '/settings',
                                    query: { page: 'security-and-privacy' },
                                },
                                undefined,
                                { shallow: true }
                            )
                        }
                    >
                        Security{'&'}Privacy
                    </button>
                </li>

                <li className="mt-4">
                    <strong className="text-primary-300">APP SETTINGS</strong>
                </li>

                <li className="w-full mt-2">
                    <button
                        className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                            page === 'keybinds' ? 'bg-primary-800' : ''
                        }`}
                        onClick={() =>
                            router.push(
                                {
                                    pathname: '/settings',
                                    query: { page: 'keybinds' },
                                },
                                undefined,
                                { shallow: true }
                            )
                        }
                    >
                        Keybinds
                    </button>
                </li> */}
            </ul>
        </div>
    );
};

export default SettingsSidebar;
