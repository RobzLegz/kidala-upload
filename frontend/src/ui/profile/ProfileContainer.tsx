import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from '../../interfaces/user';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import Gallery from '../gallery/Gallery';
import MyFilesContainer from '../gallery/MyFilesContainer';
import ProfileAboutContainer from './ProfileAboutContainer';
import ProfileInfo from './ProfileInfo';
import ProfileNavigation from './ProfileNavigation';

const ProfileContainer: React.FC = () => {
    const router = useRouter();

    const { username } = router.query;

    const userInfo: UserInfo = useSelector(selectUser);

    const [other, setOther] = useState<boolean | null>(null);
    const [profileInfo, setProfileInfo] = useState<User | null>(null);

    // useEffect(() => {
    //     if (userInfo.info && username && userInfo.info.username === username) {
    //         setOther(false);
    //         setProfileInfo(userInfo.info);
    //     } else {
    //         setOther(true);
    //     }
    // }, [userInfo.info, username]);

    useEffect(() => {
        if(!profileInfo && userInfo.info){
            setProfileInfo(userInfo.info)
        }
    }, [userInfo.info])

    // if (other === null) {
    //     return null;
    // }

    // if (other) {
    //     return (
    //         <div className="w-full flex flex-col items-center justify-start">
    //             <div className="max-w-[800px] w-[96%]">
    //                 <ProfileInfo other user={profileInfo} />

    //                 <ProfileAboutContainer other user={profileInfo} />

    //                 <Gallery user />
    //             </div>
    //         </div>
    //     );
    // }

    if (!profileInfo) {
        return null;
    }

    return (
        <div className="w-full flex flex-col items-center justify-start">
            <div className="max-w-[800px] w-[96%]">
                <ProfileInfo user={profileInfo} />

                <ProfileNavigation />

                {router.query.page && router.query.page === 'my-files' ? (
                    <MyFilesContainer isProfile />
                ) : router.query.page && router.query.page === 'favourites' ? (
                    <Gallery saved />
                ) : router.query.page && router.query.page === 'liked' ? (
                    <Gallery liked />
                ) : (
                    <ProfileAboutContainer user={profileInfo} />
                )}
            </div>
        </div>
    );
};

export default ProfileContainer;
