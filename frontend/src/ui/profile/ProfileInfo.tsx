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
                        icon={<PencilIcon className="h-4 text-primary-100" />}
                        onClick={() =>
                            router.push('/new/settings?page=profile')
                        }
                    >
                        Edit profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
