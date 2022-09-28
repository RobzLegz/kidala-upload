import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Gallery from '../gallery/Gallery';
import MyFilesContainer from '../gallery/MyFilesContainer';
import ProfileInfo from './ProfileInfo';
import ProfileNavigation from './ProfileNavigation';

const ProfileContainer = () => {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    if (!userInfo.info) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="w-11/12 max-w-[800px]">
                <ProfileInfo />

                <ProfileNavigation />

                {router.query.page && router.query.page === 'my-files' ? (
                    <MyFilesContainer isProfile />
                ) : router.query.page && router.query.page === 'favourites' ? (
                    <Gallery saved />
                ) : router.query.page && router.query.page === 'liked' ? (
                    <Gallery liked />
                ) : (
                    <div className="w-full flex flex-col bg-primary-800 rounded-lg border border-primary-700 p-4">
                        <h4 className="text-white">
                            About {userInfo.info.username}
                        </h4>

                        <div className="flex mt-6 mb-3">
                            <div className="flex">
                                <strong className="text-primary-100">
                                    {userInfo.info.followers.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Followers
                                </p>
                            </div>

                            <div className="flex ml-6">
                                <strong className="text-primary-100">
                                    {userInfo.info.following.length}
                                </strong>{' '}
                                <p className="text-primary-300 ml-1.5">
                                    Following
                                </p>
                            </div>
                        </div>

                        {userInfo.info.bio && (
                            <p className="text-white">{userInfo.info.bio}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileContainer;
