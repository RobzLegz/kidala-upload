import Image from 'next/image';
import React from 'react';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { AppInfo } from '../../redux/slices/appSlice';
import { useSelector } from 'react-redux';
import { selectApp } from './../../redux/slices/appSlice';
import GalleryNonImage from './GalleryNonImage';

export interface GalleryFileProps {
    props: FileInterface;
    index?: number;
    handleFileClick?: (index?: number, hash?: string) => void;
}

const GalleryFile: React.FC<GalleryFileProps> = ({
    props,
    index,
    handleFileClick,
}) => {
    const appInfo: AppInfo = useSelector(selectApp);
    const isImage = detectFileType(props.name) === 'image';

    const handleImageClick = () => {
        handleFileClick && handleFileClick(index, props.hash);
    };

    return (
        <div
            className={`bg-primary-800 w-full h-full ${
                !appInfo.sortOptions.showFiles && !isImage ? 'hidden' : 'flex'
            } items-center justify-center group relative rounded-xl overflow-hidden border border-primary-700 no_select`}
        >
            <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
                {isImage ? (
                    <Image
                        src={`${BASE_URL}/files/${props.hash}/${props.name}`}
                        alt={props.name}
                        draggable={false}
                        objectFit="cover"
                        layout="fill"
                        quality={75}
                        sizes="33vw"
                        blurDataURL={`${BASE_URL}/files/${props.hash}/${props.name}`}
                        placeholder="blur"
                        className="rounded-lg"
                    />
                ) : (
                    <GalleryNonImage filename={props.name} />
                )}
            </div>

            <button
                className="absolute inset-0 w-full h-full cursor-pointer rounded-lg"
                onClick={handleImageClick}
            />
        </div>
    );
};

export default GalleryFile;
