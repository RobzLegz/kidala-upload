import { useRouter } from 'next/router';
import React from 'react';

const ProfileNavigation = () => {
    const router = useRouter();

    return (
        <div className="w-full flex items-center justify-center h-14">
            <button
                className="w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: '/new/profile',
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`${
                        !router.query.page || router.query.page === ''
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    About
                </strong>
            </button>

            <button
                className="w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: '/new/profile',
                            query: { page: 'my-files' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`${
                        router.query.page === 'my-files'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    My files
                </strong>
            </button>

            <button
                className="w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: '/new/profile',
                            query: { page: 'liked' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`${
                        router.query.page === 'liked'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    Liked
                </strong>
            </button>

            <button
                className="w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: '/new/profile',
                            query: { page: 'favourites' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`${
                        router.query.page === 'favourites'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    Favourites
                </strong>
            </button>
        </div>
    );
};

export default ProfileNavigation;
