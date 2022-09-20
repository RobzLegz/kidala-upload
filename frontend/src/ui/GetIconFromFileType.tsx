import {
    DocumentIcon,
    MusicalNoteIcon,
    VideoCameraIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AppInfo } from '../redux/slices/appSlice';
import { ImageDimensions } from '../types/ImageDimensions';
import { FileType } from '../utils/detectFileType';
import { getRandImage } from '../utils/getRandomImage';
import MusicPlate from './gallery/MusicPlate';
import { useSelector } from 'react-redux';
import { selectApp } from './../redux/slices/appSlice';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export interface GetIconFromFileTypeProps {
    extension?: FileType | null;
    className?: string;
    source?: string;
    imageDimensions?: ImageDimensions;
    file?: boolean;
}

const GetIconFromFileType: React.FC<GetIconFromFileTypeProps> = ({
    extension,
    className,
    source,
    file = false,
    imageDimensions,
}) => {
    const appInfo: AppInfo = useSelector(selectApp);

    const [randImage, setRandImage] = useState<string | null>(null);

    useEffect(() => {
        if (extension === 'audio' && file && appInfo.files && !randImage) {
            const img = getRandImage(appInfo.files);
            setRandImage(img);
        }
    }, [appInfo.files]);

    if (!extension || !appInfo.files) {
        return (
            <DocumentTextIcon
                className={`text-primary-100 w-6 ${className && className}`}
            />
        );
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
            if (file && randImage) {
                return <MusicPlate image={randImage} />;
            }

            return (
                <MusicalNoteIcon
                    className={`text-primary-100 w-6 ${className && className}`}
                />
            );
        case 'video':
            return (
                <VideoCameraIcon
                    className={`text-primary-100 w-6 ${className && className}`}
                />
            );
        case 'word':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/word.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'css':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/css-3.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'html':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/html-5.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'js':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/javascript.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'scss':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/sass.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'pdf':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/pdf.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        case 'json':
            return (
                <div
                    className={`flex items-center justify-center relative w-6 h-6 ${
                        className ? className : ''
                    }`}
                >
                    <Image
                        src="/media-icons/json.png"
                        objectFit="contain"
                        draggable={false}
                        layout="fill"
                    />
                </div>
            );
        default:
            return (
                <DocumentTextIcon
                    className={`text-primary-100 w-6 ${className && className}`}
                />
            );
    }
};

export default GetIconFromFileType;
