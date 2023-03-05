import React from 'react';
import Spinner from '../Spinner';

const GallerySpinner = () => {
    return (
        <div className="w-full flex items-center justify-center h-12">
            <Spinner size="8" />
        </div>
    );
};

export default GallerySpinner;
