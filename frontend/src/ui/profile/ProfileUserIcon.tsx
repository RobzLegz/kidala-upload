import { UserIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

const ProfileUserIcon = () => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div className="absolute">
            {userInfo.info?.avatar ? (
                ''
            ) : (
                <div className="bg-primary-800 rounded-full border-2 border-primary-900 h-20 w-20">
                    <UserIcon className="h-[76px] text-primary-200" />
                </div>
            )}
        </div>
    );
};

export default ProfileUserIcon;
