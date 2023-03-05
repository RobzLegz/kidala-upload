import React from 'react';
import Navigation from '../navigation/Navigation';
import dynamic from 'next/dynamic';

const GalleryImages = dynamic(() => import('./GalleryImages'));

function GalleryContainer() {
    return (
        <div className="w-full min-h-screen pt-10 px-2">
            <Navigation />

            <GalleryImages />
        </div>
    );
}

export default GalleryContainer;
