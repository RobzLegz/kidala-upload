import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { ProfileUserIconProps } from './ProfileUserIcon';

const ProfileBanner: React.FC<ProfileUserIconProps> = ({
    className,
    tempAvatar,
    isEdit = false,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    const [banner, setBanner] = useState('');

    useEffect(() => {
        if (isEdit) {
            if (tempAvatar) {
                setBanner(tempAvatar);
            } else {
                setBanner('');
            }
        } else {
            if (userInfo.info) {
                if (userInfo.info.banner) {
                    setBanner(userInfo.info.banner);
                } else if (tempAvatar) {
                    setBanner(tempAvatar);
                } else {
                    setBanner('');
                }
            }
        }
    }, [isEdit, tempAvatar, userInfo.info]);

    return (
        <div>
            {banner ? (
                <div className="h-24 sm:h-36 w-full rounded-t-lg relative">
                    <Image
                        objectFit="cover"
                        src={banner}
                        layout="fill"
                        className="rounded-t-lg"
                        draggable={false}
                        alt="Kidala"
                    />
                </div>
            ) : (
                <div className="h-24 sm:h-36 w-full bg-sky-900 rounded-t-lg"></div>
            )}
        </div>
    );
};

export default ProfileBanner;
