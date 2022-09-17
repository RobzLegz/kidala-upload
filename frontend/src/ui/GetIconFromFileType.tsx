import {
    DocumentIcon,
    MusicalNoteIcon,
    VideoCameraIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import React from 'react';
import { ImageDimensions } from '../types/ImageDimensions';
import { FileType } from '../utils/detectFileType';

export interface GetIconFromFileTypeProps {
    extension?: FileType | null;
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
        case 'text':
            return (
                <DocumentIcon
                    className={`text-primary-100 w-full ${
                        className && className
                    }`}
                />
            );
        case 'audio':
            return (
                <MusicalNoteIcon
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
        case 'word':
            return (
                <div
                    className={`flex items-center justify-center ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/word.png"
                        width={20}
                        height={20}
                        objectFit="contain"
                        draggable={false}
                    />
                </div>
            );
        case 'css':
            return (
                <div
                    className={`flex items-center justify-center ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/css-3.png"
                        width={20}
                        height={20}
                        objectFit="contain"
                        draggable={false}
                    />
                </div>
            );
        case 'html':
            return (
                <div
                    className={`flex items-center justify-center ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/html-5.png"
                        width={20}
                        height={20}
                        objectFit="contain"
                        draggable={false}
                    />
                </div>
            );
        case 'js':
            return (
                <div
                    className={`flex items-center justify-center ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/javascript.png"
                        width={20}
                        height={20}
                        objectFit="contain"
                        draggable={false}
                    />
                </div>
            );
        case 'scss':
            return (
                <div
                    className={`flex items-center justify-center ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/sass.png"
                        width={20}
                        height={20}
                        objectFit="contain"
                        draggable={false}
                    />
                </div>
            );
    }

    return null;
};

export default GetIconFromFileType;
