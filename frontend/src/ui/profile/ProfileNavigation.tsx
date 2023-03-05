import { BookmarkIcon, FolderIcon, HeartIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';

const ProfileNavigation = () => {
    const router = useRouter();
    const windowSize = useWindowSize();

    const { query, pathname } = router;

    const { page, username } = query;

    useEffect(() => {
        if (
            windowSize.width &&
            windowSize.width < windowSizes.sm &&
            page !== 'my-files' &&
            page !== 'liked' &&
            page !== 'favourites'
        ) {
            router.push(
                {
                    pathname: pathname,
                    query: { ...query, page: 'my-files' },
                },
                undefined,
                { shallow: true }
            );
        }
    }, [page, windowSize.width]);

    return (
        <div className="w-full flex items-center justify-start h-14">
            <button
                className="w-1/3 sm:w-1/4 h-full hidden sm:flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: pathname,
                            query: { username: username },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`${
                        !page || page === ''
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    About
                </strong>
            </button>

            <button
                className="w-1/3 sm:w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: pathname,
                            query: { ...query, page: 'my-files' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`hidden sm:block ${
                        page === 'my-files'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    My files
                </strong>

                <FolderIcon
                    className={`block sm:hidden h-8 ${
                        page === 'my-files' ? 'text-sky-800' : 'text-white'
                    }`}
                />
            </button>

            {/* <button
                className="w-1/3 sm:w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: pathname,
                            query: { ...query, page: 'liked' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`hidden sm:block ${
                        page === 'liked'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    Liked
                </strong>

                <HeartIcon
                    className={`block sm:hidden h-8 ${
                        page === 'liked' ? 'text-notification' : 'text-white'
                    }`}
                />
            </button> */}

            <button
                className="w-1/3 sm:w-1/4 h-full flex items-center justify-center"
                onClick={() =>
                    router.push(
                        {
                            pathname: pathname,
                            query: { ...query, page: 'favourites' },
                        },
                        undefined,
                        { shallow: true }
                    )
                }
            >
                <strong
                    className={`hidden sm:block ${
                        page === 'favourites'
                            ? 'text-accent underline underline-offset-2'
                            : 'text-white'
                    }`}
                >
                    Favourites
                </strong>

                <BookmarkIcon
                    className={`block sm:hidden h-8 ${
                        page === 'favourites'
                            ? 'text-notification-loading'
                            : 'text-white'
                    }`}
                />
            </button>
        </div>
    );
};

export default ProfileNavigation;
