import React from 'react';
import UploadForm from '../../ui/uploadForm/UploadForm';
import PageModule from '../PageModule';

function Home() {
    return (
        <PageModule
            title="Home"
            description="Kidala file upload. Free file hosting, unlimited uploads"
            className="justify-center"
        >
            <UploadForm />
        </PageModule>
    );
}

export default Home;
