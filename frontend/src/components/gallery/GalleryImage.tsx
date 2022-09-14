import { DocumentIcon, MusicNoteIcon, VideoCameraIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp, setPreviewIdx } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { AdIndicator } from '../ads/AdIndicator';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { detectFileType } from '../../utils/detectFileType';

const GalleryImage: React.FC<{
    file: FileInterface;
    index: number;
    isSeen: boolean;
    windowSize: {
        width: number | undefined;
        height: number | undefined;
    };
}> = ({ file, index, isSeen, windowSize }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const viewFile = () => {
        if (appInfo.files && index + 1 >= appInfo.files.length) {
            dispatch(setPreviewIdx(null));
        } else {
            dispatch(setPreviewIdx(index));
        }

        if (
            router.pathname === '/my-files' ||
            router.pathname === '/my-files/[hash]'
        ) {
            router.push(`/my-files/${file.hash}`);
        } else {
            router.push(`/gallery/${file.hash}`);
        }
    };

    if (
        file.author &&
        file.private &&
        (file.author !== userInfo.info?._id ||
            (router.pathname !== '/my-files' &&
                router.pathname !== '/my-files/[hash]'))
    ) {
        return null;
    }

    if (detectFileType(file.name) !== 'image') {
        if (
            !appInfo.sortOptions.showFiles &&
            router.pathname !== '/my-files' &&
            router.pathname !== '/my-files/[hash]'
        ) {
            return null;
        }

        return (
            <div
                className="w-full h-full flex items-center justify-center group relative cursor-pointer"
                onClick={viewFile}
            >
                <div className="w-[250px] md:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] 2xl:h-[400px] max-w-full max-h-full relative flex flex-col items-center justify-center">
                    {detectFileType(file.name) === 'audio' ? (
                        <MusicNoteIcon className="text-white h-16" />
                    ) : detectFileType(file.name) === 'video' ? (
                        <VideoCameraIcon className="text-white h-16" />
                    ) : (
                        <DocumentIcon className="text-white h-16" />
                    )}

                    <p className="text-white w-full truncate text-center">
                        {file.name}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center group relative cursor-pointer"
            onClick={viewFile}
        >
            {file.is_ad ? <AdIndicator /> : null}

            <div className="w-[250px] md:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] 2xl:h-[400px] max-w-full max-h-full relative">
                <Image
                    src={`${BASE_URL}/${file.hash}`}
                    alt={file.name}
                    draggable={false}
                    objectFit="cover"
                    layout="fill"
                    quality={65}
                    blurDataURL={`${BASE_URL}/${file.hash}`}
                    placeholder="blur"
                />
            </div>
        </div>
    );
};

export default GalleryImage;
