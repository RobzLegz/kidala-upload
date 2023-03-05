import { PencilIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React from 'react';
import { User } from '../../interfaces/user';
import Button from '../Button';
import ProfileBanner from './ProfileBanner';
import ProfileUserIcon from './ProfileUserIcon';

export interface ProfileInfoProps {
    other?: boolean;
    user?: User | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
    user = null,
    other = false,
}) => {
    const router = useRouter();

    if (!user) {
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
                            {user.name ? user.name : user.username}
                        </h3>

                        <small className="text-primary-300">
                            @{user.username}
                        </small>
                    </div>
                </div>

                <div className="pt-1 hidden sm:flex">
                    <Button
                        color="primary-300"
                        size="small"
                        icon={<PencilIcon className="h-4 text-primary-100" />}
                        onClick={() =>
                            router.push('/settings?page=profile')
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
                    onClick={() => router.push('/settings?page=profile')}
                    className="w-full max-w-[200px]"
                >
                    Edit profile
                </Button>
            </div>

            <div className="w-full flex items-center justify-center sm:hidden flex-col px-4">
                <div className="flex my-2">
                    <div className="flex">
                        <strong className="text-primary-100">
                            {user.followers.length}
                        </strong>{' '}
                        <p className="text-primary-300 ml-1.5">Followers</p>
                    </div>

                    <div className="flex ml-6">
                        <strong className="text-primary-100">
                            {user.following.length}
                        </strong>{' '}
                        <p className="text-primary-300 ml-1.5">Following</p>
                    </div>
                </div>

                {user.bio && (
                    <div className="w-full">
                        <p className="text-white">{user.bio}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;
