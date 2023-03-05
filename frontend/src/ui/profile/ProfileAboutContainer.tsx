import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces/user';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';

export interface ProfileAboutContainerProps {
    other?: boolean;
    user?: User | null
}

const ProfileAboutContainer: React.FC<ProfileAboutContainerProps> = ({
    other = false,
    user = null
}) => {
    if(!user){
        return null;
    }

    return (
        <div className="w-full hidden sm:flex flex-col bg-primary-800 rounded-lg border border-primary-700 p-4">
            <h4 className="text-white">About {user.username}</h4>

            <div className="flex mt-6 mb-3">
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
                <p className="text-white">{user.bio}</p>
            )}
        </div>
    );
};

export default ProfileAboutContainer;
