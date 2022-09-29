import Image from 'next/image';
import React from 'react';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
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
    const appInfo: AppInfo = useSelector(selectApp);

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
            <div className="flex items-center justify-center w-[200px] sm:w-[250px] md:w-[400px] h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] max-w-full max-h-full relative overflow-hidden">
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

            {/* <FileControls
                className="hidden sm:flex h-10 w-full items-center justify-between absolute bottom-0 rounded-b-lg z-10 transition-all duration-300 px-2 bg-transparent_dark translate-y-full group-hover:translate-y-0"
                file={props}
            /> */}
        </div>
    );
};

export default GalleryFile;
