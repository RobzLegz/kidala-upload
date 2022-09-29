import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { ProfileUserIconProps } from './ProfileUserIcon';

const ProfileBanner: React.FC<ProfileUserIconProps> = ({
    className,
    tempAvatar,
    isEdit = false,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    return (
        <div>
            {(!isEdit && userInfo.info?.avatar) || tempAvatar ? (
                <div className="h-24 sm:h-36 w-full rounded-t-lg relative">
                    <Image
                        objectFit="cover"
                        src={
                            isEdit
                                ? tempAvatar
                                    ? tempAvatar
                                    : ''
                                : userInfo.info?.banner
                                ? userInfo.info?.banner
                                : tempAvatar
                                ? tempAvatar
                                : ''
                        }
                        layout="fill"
                        className="rounded-t-lg"
                        draggable={false}
                    />
                </div>
            ) : (
                <div className="h-24 sm:h-36 w-full bg-sky-900 rounded-t-lg"></div>
            )}
        </div>
    );
};

export default ProfileBanner;
