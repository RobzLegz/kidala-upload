import { PencilIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Button from '../Button';
import MyFilesContainer from '../gallery/MyFilesContainer';
import ProfileUserIcon from './ProfileUserIcon';

const ProfileContainer = () => {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    if (!userInfo.info) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-11/12 max-w-[800px]">
                <div className="w-full flex flex-col bg-primary-800 rounded-lg border border-primary-700">
                    <div className="h-36 w-full bg-sky-900 rounded-t-lg"></div>

                    <div className="relative w-full flex justify-between items-start min-h-[80px] px-5 py-2">
                        <div className="flex">
                            <div className="absolute -top-6">
                                <ProfileUserIcon />
                            </div>

                            <div className="flex flex-col pl-24">
                                <h3 className="text-white">
                                    {userInfo.info.name
                                        ? userInfo.info.name
                                        : userInfo.info.username}
                                </h3>

                                <small className="text-primary-300">
                                    @{userInfo.info.username}
                                </small>
                            </div>
                        </div>

                        <div className="flex pt-1">
                            <Button
                                color="primary-300"
                                size="small"
                                icon={
                                    <PencilIcon className="h-4 text-primary-100" />
                                }
                            >
                                Edit profile
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center h-14">
                    <button
                        className="w-1/3 h-full flex items-center justify-center"
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
                        className="w-1/3 h-full flex items-center justify-center"
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
                        className="w-1/3 h-full flex items-center justify-center"
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

                {router.query.page && router.query.page === 'my-files' ? (
                    <MyFilesContainer />
                ) : router.query.page && router.query.page === 'favourites' ? (
                    <div className="w-full flex flex-col bg-primary-800 rounded-lg border border-primary-700 p-4">
                        <h4 className="text-white">
                            About {userInfo.info.username}
                        </h4>

                        <div className="flex mt-6 mb-3">
                            <div className="flex">
                                <strong className="text-primary-100">
                                    {userInfo.info.followers.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Followers
                                </p>
                            </div>

                            <div className="flex ml-6">
                                <strong className="text-primary-100">
                                    {userInfo.info.following.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Following
                                </p>
                            </div>
                        </div>

                        {userInfo.info.bio && (
                            <p className="text-white">{userInfo.info.bio}</p>
                        )}
                    </div>
                ) : (
                    <div className="w-full flex flex-col bg-primary-800 rounded-lg border border-primary-700 p-4">
                        <h4 className="text-white">
                            About {userInfo.info.username}
                        </h4>

                        <div className="flex mt-6 mb-3">
                            <div className="flex">
                                <strong className="text-primary-100">
                                    {userInfo.info.followers.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Followers
                                </p>
                            </div>

                            <div className="flex ml-6">
                                <strong className="text-primary-100">
                                    {userInfo.info.following.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Following
                                </p>
                            </div>
                        </div>

                        {userInfo.info.bio && (
                            <p className="text-white">{userInfo.info.bio}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileContainer;
