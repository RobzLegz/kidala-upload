import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const SettingsSidebar = () => {
    const router = useRouter();

    const { page } = router.query;

    useEffect(() => {
        if (!page) {
            router.push(
                {
                    pathname: '/new/settings',
                    query: { page: 'profile' },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [page]);

    return (
        <ul className="flex flex-col h-full w-60 px-2 fixed left-12 top-24">
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
                                pathname: '/new/settings',
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

            <li className="w-full mt-2">
                <button
                    className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                        page === 'account' ? 'bg-primary-800' : ''
                    }`}
                    onClick={() =>
                        router.push(
                            {
                                pathname: '/new/settings',
                                query: { page: 'account' },
                            },
                            undefined,
                            { shallow: true }
                        )
                    }
                >
                    Account
                </button>
            </li>

            <li className="w-full mt-2">
                <button
                    className={`w-full h-8 flex items-center justify-start text-primary-100 rounded-lg px-4 ${
                        page === 'security-and-privacy' ? 'bg-primary-800' : ''
                    }`}
                    onClick={() =>
                        router.push(
                            {
                                pathname: '/new/settings',
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
                                pathname: '/new/settings',
                                query: { page: 'keybinds' },
                            },
                            undefined,
                            { shallow: true }
                        )
                    }
                >
                    Keybinds
                </button>
            </li>
        </ul>
    );
};

export default SettingsSidebar;
