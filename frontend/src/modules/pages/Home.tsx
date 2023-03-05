import { NextPage } from 'next';
import React from 'react';
import Nav from '../../ui/navigation/Nav';
import UploadForm from '../../ui/uploadForm/UploadForm';
import PageModule from '../PageModule';

const Home: NextPage = () => {
    return (
        <PageModule
            title="Home"
            description="Kidala file upload. Free file hosting, unlimited uploads"
            className="justify-center h-screen"
        >
            <Nav />

            <UploadForm />
        </PageModule>
    );
}

export default Home;
