import {
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import { useRouter } from 'next/router';
import { detectFileType } from '../../utils/detectFileType';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { AppInfo } from '../../redux/slices/appSlice';
import { useSelector } from 'react-redux';
import { selectApp } from './../../redux/slices/appSlice';
import GalleryNonImage from './GalleryNonImage';
import FileControls from '../FileControls';

export interface GalleryFileProps {
    props: FileInterface;
    testLikes?: number;
    testShares?: number;
    testSaves?: number;
    testSaved?: boolean;
    testGivenLikes?: number;
    index?: number;
    handleFileClick?: (index?: number, hash?: string) => void;
}

const GalleryFile: React.FC<GalleryFileProps> = ({
    props,
    testSaves,
    testLikes,
    testShares,
    testSaved,
    testGivenLikes,
    index,
    handleFileClick,
}) => {
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);
    const appInfo: AppInfo = useSelector(selectApp);

    const [totalLikes, setTotalLikes] = useState(testLikes ? testLikes : 0);
    const [givenLikes, setGivenLikes] = useState(
        testGivenLikes ? testGivenLikes : 0
    );
    const [saved, setSaved] = useState(testSaved ? true : false);

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleLike = () => {
        setGivenLikes(givenLikes + 1);
        setTotalLikes(totalLikes + 1);
    };

    const handleDislike = () => {
        if (givenLikes > 0) {
            setGivenLikes(givenLikes - 1);
            setTotalLikes(totalLikes - 1);
        }
    };

    const handleImageClick = () => {
        handleFileClick && handleFileClick(index, props.hash);
    };

    return (
        <div
            className={`bg-primary-800 w-full h-full items-center justify-center group relative rounded-lg overflow-hidden border border-primary-700 no_select ${
                !appInfo.sortOptions.showFiles &&
                detectFileType(props.name) !== 'image'
                    ? 'hidden'
                    : 'flex'
            }`}
        >
            <div className="flex items-center justify-center w-[200px] sm:w-[250px] md:w-[400px] h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] max-w-full max-h-full relative">
                {detectFileType(props.name) === 'image' ? (
                    <Image
                        src={`${BASE_URL}/files/${props.hash}/${props.name}`}
                        alt={props.name}
                        draggable={false}
                        objectFit="cover"
                        layout="fill"
                        quality={65}
                        blurDataURL={`${BASE_URL}/files/${props.hash}/${props.name}`}
                        placeholder="blur"
                        className="rounded-lg"
                    />
                ) : (
                    <GalleryNonImage filename={props.name} />
                )}
            </div>

            <div
                className="absolute rounded-t-lg w-full top-0 left-0 h-full cursor-pointer"
                onClick={handleImageClick}
            />

            <FileControls
                className="hidden sm:flex h-10 w-full items-center justify-between absolute bottom-0 rounded-b-lg z-10 transition-all duration-300 px-2 bg-transparent_dark translate-y-full group-hover:translate-y-0"
                file={props}
            />
        </div>
    );
};

export default GalleryFile;
