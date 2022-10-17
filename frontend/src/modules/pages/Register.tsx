import React from 'react';
import AuthForm from '../../ui/auth/AuthForm';
import Nav from '../../ui/navigation/Nav';
import MainNotification from '../../ui/notifications/MainNotification';
import PageModule from '../PageModule';

const Register = () => {
    return (
        <PageModule
            title="Register"
            description="Kidala file upload. Free file hosting, unlimited uploads"
            className="justify-center h-screen"
        >
            <Nav />

            <MainNotification />

            <AuthForm register />
        </PageModule>
    );
};

export default Register;
