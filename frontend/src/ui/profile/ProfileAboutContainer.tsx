import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

const ProfileAboutContainer = () => {
    const userInfo: UserInfo = useSelector(selectUser);

    if (!userInfo.info) {
        return null;
    }

    return (
        <div className="w-full hidden sm:flex flex-col bg-primary-800 rounded-lg border border-primary-700 p-4">
            <h4 className="text-white">About {userInfo.info.username}</h4>

            <div className="flex mt-6 mb-3">
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
                <p className="text-white">{userInfo.info.bio}</p>
            )}
        </div>
    );
};

export default ProfileAboutContainer;
