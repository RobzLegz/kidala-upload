import React from 'react';
import { detectFileType } from '../../utils/detectFileType';
import GetIconFromFileType from '../GetIconFromFileType';

export interface GalleryNonImageProps {
    filename: string;
}

const GalleryNonImage: React.FC<GalleryNonImageProps> = ({ filename }) => {
    return (
        <div
            className="flex flex-col items-center justify-center"
        >
            <GetIconFromFileType
                extension={detectFileType(filename)}
                className="w-10 h-10"
                file
            />

            <p className='text-center text-accent mt-2 h-6 overflow-visible'>{filename}</p>
        </div>
    );
};

export default GalleryNonImage;
