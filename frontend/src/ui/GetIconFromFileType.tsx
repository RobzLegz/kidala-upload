import { MusicNoteIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { ImageDimensions } from '../types/ImageDimensions';
import { FileType } from '../utils/detectFileType';

export interface GetIconFromFileTypeProps {
    extension?: FileType['file'] | null;
    className?: string;
    source?: string;
    imageDimensions?: ImageDimensions;
}

const GetIconFromFileType: React.FC<GetIconFromFileTypeProps> = ({
    extension,
    className,
    source,
    imageDimensions,
}) => {
    if (!extension) {
        return null;
    }

    switch (extension) {
        case 'image':
            if (!source) {
                return null;
            }

            return (
                <Image
                    src={source}
                    objectFit="cover"
                    draggable={false}
                    width={
                        imageDimensions
                            ? imageDimensions.width
                                ? imageDimensions.width
                                : 128
                            : 128
                    }
                    height={
                        imageDimensions
                            ? imageDimensions.height
                                ? imageDimensions.height
                                : 164
                            : 164
                    }
                />
            );
        case 'audio':
            return (
                <MusicNoteIcon
                    className={`text-primary-100 w-full ${
                        className && className
                    }`}
                />
            );
        case 'video':
            return (
                <VideoCameraIcon
                    className={`text-primary-100 w-full ${
                        className && className
                    }`}
                />
            );
    }

    return null;
};

export default GetIconFromFileType;
