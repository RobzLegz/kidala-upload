import { UserIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

export interface ProfileUserIconProps {
    className?: string;
    tempAvatar?: string;
}

const ProfileUserIcon: React.FC<ProfileUserIconProps> = ({
    className,
    tempAvatar,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div className={`absolute ${className ? className : ''}`}>
            {userInfo.info?.avatar || tempAvatar ? (
                <div className="bg-primary-800 rounded-full border-2 border-primary-100 h-20 w-20 relative">
                    <Image
                        objectFit="cover"
                        src={
                            userInfo.info?.avatar
                                ? userInfo.info?.avatar
                                : tempAvatar
                                ? tempAvatar
                                : ''
                        }
                        layout="fill"
                        className="rounded-full"
                        draggable={false}
                    />
                </div>
            ) : (
                <div className="bg-primary-800 rounded-full border-2 border-primary-100 h-20 w-20">
                    <UserIcon className="h-[76px] text-primary-200" />
                </div>
            )}
        </div>
    );
};

export default ProfileUserIcon;
