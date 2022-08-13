import Link from 'next/link';
import React from 'react';
import GalleryImages from './GalleryImages';

function GalleryContainet() {
    return (
        <div className="w-full bg-orange-500 min-h-screen pt-10 px-2">
            <Link href="/">
                <p className="text-blue-300 hover:underline focus:underline">
                    Upload more
                </p>
            </Link>

            <GalleryImages />
        </div>
    );
}

export default GalleryContainet;
