import { NextPage } from 'next';
import React from 'react';
import Nav from '../../ui/navigation/Nav';
import ProfileContainer from '../../ui/profile/ProfileContainer';
import PageModule from '../PageModule';

const Profile: NextPage = () => {
    return (
        <PageModule
            title="Profile"
            description="Your profile on kidala upload file hosting services"
            className="pt-24"
        >
            <Nav />

            <ProfileContainer />
        </PageModule>
    );
};

export default Profile;
