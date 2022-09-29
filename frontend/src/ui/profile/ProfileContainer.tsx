import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Gallery from '../gallery/Gallery';
import MyFilesContainer from '../gallery/MyFilesContainer';
import ProfileAboutContainer from './ProfileAboutContainer';
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
            <div className="max-w-[800px] w-[96%]">
                <ProfileInfo />

                <ProfileNavigation />

                {router.query.page && router.query.page === 'my-files' ? (
                    <MyFilesContainer isProfile />
                ) : router.query.page && router.query.page === 'favourites' ? (
                    <Gallery saved />
                ) : router.query.page && router.query.page === 'liked' ? (
                    <Gallery liked />
                ) : (
                    <ProfileAboutContainer />
                )}
            </div>
        </div>
    );
};

export default ProfileContainer;
