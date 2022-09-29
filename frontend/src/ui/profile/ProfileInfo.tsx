import { PencilIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Button from '../Button';
import ProfileBanner from './ProfileBanner';
import ProfileUserIcon from './ProfileUserIcon';

const ProfileInfo = () => {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    if (!userInfo.info) {
        return null;
    }

    return (
        <div className="w-full flex flex-col bg-primary-800 rounded-lg border border-primary-700">
            <ProfileBanner />

            <div className="relative w-full flex justify-center items-center sm:justify-between sm:items-start sm:min-h-[80px] px-5 py-2">
                <div className="flex">
                    <div className="sm:absolute -top-6">
                        <ProfileUserIcon className="relative sm:absolute" />
                    </div>

                    <div className="flex flex-col pl-4 sm:pl-24">
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

                <div className="pt-1 hidden sm:flex">
                    <Button
                        color="primary-300"
                        size="small"
                        icon={<PencilIcon className="h-4 text-primary-100" />}
                        onClick={() =>
                            router.push('/new/settings?page=profile')
                        }
                    >
                        Edit profile
                    </Button>
                </div>
            </div>

            <div className="w-full flex sm:hidden items-center justify-center my-2 px-2">
                <Button
                    color="primary-300"
                    size="small"
                    icon={<PencilIcon className="h-4 text-primary-100" />}
                    onClick={() => router.push('/new/settings?page=profile')}
                    className="w-full max-w-[200px]"
                >
                    Edit profile
                </Button>
            </div>

            <div className="w-full flex items-center justify-center sm:hidden flex-col px-4">
                <div className="flex my-2">
                    <div className="flex">
                        <strong className="text-primary-100">
                            {userInfo.info.followers.length}
                        </strong>{' '}
                        <p className="text-primary-300 ml-1.5">Followers</p>
                    </div>

                    <div className="flex ml-6">
                        <strong className="text-primary-100">
                            {userInfo.info.following.length}
                        </strong>{' '}
                        <p className="text-primary-300 ml-1.5">Following</p>
                    </div>
                </div>

                {userInfo.info.bio && (
                    <div className="w-full">
                        <p className="text-white">{userInfo.info.bio}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;
