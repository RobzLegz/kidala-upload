import React from 'react';
// import Ads from '../myads/ads';
import UploadForm from '../upload/UploadForm';

function HomePage() {
    return (
        <div className="page flex items-center justify-center flex-col bg-orange-400">
            <h1 className="mb-20 text-white">Kidala upload</h1>

            <UploadForm />

            {/* <Ads /> */}
        </div>
    );
}

export default HomePage;
