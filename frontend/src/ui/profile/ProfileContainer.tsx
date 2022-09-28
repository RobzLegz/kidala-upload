import { PencilIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Button from '../Button';
import Gallery from '../gallery/Gallery';
import MyFilesContainer from '../gallery/MyFilesContainer';
import ProfileNavigation from './ProfileNavigation';
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

                <ProfileNavigation />

                {router.query.page && router.query.page === 'my-files' ? (
                    <MyFilesContainer isProfile />
                ) : router.query.page && router.query.page === 'favourites' ? (
                    <Gallery saved />
                ) : router.query.page && router.query.page === 'liked' ? (
                    <Gallery liked />
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
