import React from 'react';
import { detectFileType } from '../../utils/detectFileType';
import GetIconFromFileType from '../GetIconFromFileType';

export interface GalleryNonImageProps {
    filename: string;
}

const GalleryNonImage: React.FC<GalleryNonImageProps> = ({ filename }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full relative">
            <GetIconFromFileType
                extension={detectFileType(filename)}
                className="w-10 h-10"
                file
            />

            <div className="w-full mt-2 h-6 overflow-hidden px-2">
                <p className="text-center text-accent truncate">
                    {filename}
                </p>
            </div>
        </div>
    );
};

export default GalleryNonImage;
