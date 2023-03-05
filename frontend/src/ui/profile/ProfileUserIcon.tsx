import { UserIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

export interface ProfileUserIconProps {
    className?: string;
    tempAvatar?: string;
    avatar?: string;
    showAvatar?: boolean;
    isEdit?: boolean;
}

const ProfileUserIcon: React.FC<ProfileUserIconProps> = ({
    className,
    tempAvatar,
    avatar,
    showAvatar = false,
    isEdit = false,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    const [cAvatar, setCAvatar] = useState('');

    useEffect(() => {
        if (isEdit) {
            if (tempAvatar) {
                setCAvatar(tempAvatar);
            } else {
                setCAvatar('');
            }
        } else {
            if (userInfo.info) {
                if (userInfo.info.avatar) {
                    setCAvatar(userInfo.info.avatar);
                } else if (tempAvatar) {
                    setCAvatar(tempAvatar);
                } else {
                    setCAvatar('');
                }
            }
        }
    }, [isEdit, tempAvatar, userInfo.info]);

    if (showAvatar) {
        return (
            <div>
                {avatar ? (
                    <div className="h-10 w-10 relative">
                        <Image
                            objectFit="cover"
                            src={avatar}
                            layout="fill"
                            className="rounded-full"
                            draggable={false}
                        />
                    </div>
                ) : (
                    <div className="bg-primary-800 rounded-full h-10 w-10">
                        <UserIcon className="w-full text-primary-200" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`absolute ${className ? className : ''}`}>
            {cAvatar ? (
                <div className="bg-primary-800 rounded-full border-2 border-primary-100 h-16 sm:h-20 w-16 sm:w-20 relative">
                    <Image
                        objectFit="cover"
                        src={cAvatar}
                        layout="fill"
                        className="rounded-full"
                        draggable={false}
                    />
                </div>
            ) : (
                <div className="bg-primary-800 rounded-full border-2 border-primary-100 h-16 sm:h-20 w-16 sm:w-20">
                    <UserIcon className="h-[60px] sm:h-[76px] text-primary-200" />
                </div>
            )}
        </div>
    );
};

export default ProfileUserIcon;
