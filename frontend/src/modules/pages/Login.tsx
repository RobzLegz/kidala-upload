import React from 'react'
import AuthForm from '../../ui/auth/AuthForm';
import HomeNav from '../../ui/navigation/HomeNav';
import PageModule from '../PageModule';

const Login = () => {
    return (
        <PageModule
            title="Login"
            description="Kidala file upload. Free file hosting, unlimited uploads"
            className="justify-center h-screen"
        >
            <HomeNav />

            <AuthForm />
        </PageModule>
    );
}

export default Login