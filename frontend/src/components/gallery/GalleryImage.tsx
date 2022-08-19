import { DocumentIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { setPreviewIdx } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';

const GalleryImage: React.FC<{ file: FileInterface; index: number }> = ({
    file,
    index,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const viewFile = () => {
        dispatch(setPreviewIdx(index));

        router.push(`/gallery/${file.hash}`);
    };

    if (
        !file.name.includes('.png') &&
        !file.name.includes('.jpg') &&
        !file.name.includes('.gif') &&
        !file.name.includes('.jpeg') &&
        !file.name.includes('.svg') &&
        !file.name.includes('.jfif') &&
        !file.name.includes('.webp')
    ) {
        return (
            <div
                className="w-full h-full flex items-center justify-center group relative cursor-pointer"
                onClick={() => router.push(`/gallery/${file.hash}`)}
            >
                <div className="w-[200px] h-[200px] max-w-full max-h-full relative flex flex-col items-center justify-center">
                    <DocumentIcon className="text-white h-16" />

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
            <div className="w-[200px] h-[200px] max-w-full max-h-full relative">
                <Image
                    src={`${BASE_URL}/${file.hash}`}
                    alt={file.name}
                    draggable={false}
                    objectFit="cover"
                    layout="fill"
                />
            </div>
        </div>
    );
};

export default GalleryImage;
