import { NextPage } from 'next';
import React from 'react';
import HomeNav from '../../ui/navigation/HomeNav';
import UploadForm from '../../ui/uploadForm/UploadForm';
import PageModule from '../PageModule';

const Home: NextPage = () => {
    return (
        <PageModule
            title="Home"
            description="Kidala file upload. Free file hosting, unlimited uploads"
            className="justify-center h-screen"
        >
            <HomeNav />

            <UploadForm />
        </PageModule>
    );
}

export default Home;
