import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import useWindowSize from '../hooks/useWindowSize';

const GalleryImage: React.FC<{ file: FileInterface }> = ({ file }) => {
    const windowSize = useWindowSize();
    const router = useRouter();

    const [isLeft, setIsLeft] = useState(true);

    const checkPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { width } = windowSize;

        if (width) {
            if (e.clientX > width / 2) {
                setIsLeft(false);
            }
        }
    };

    if (
        !file.name.includes('.png') &&
        !file.name.includes('.jpg') &&
        !file.name.includes('.gif') &&
        !file.name.includes('.jpeg') &&
        !file.name.includes('.svg') &&
        !file.name.includes('.webp')
    ) {
        return null;
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center group relative cursor-pointer"
            onClick={() => router.push(`/gallery/${file.hash}`)}
            onMouseOver={checkPosition}
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

            <div
                className={`absolute top-0 w-full h-full z-20 ${
                    isLeft ? 'left-0' : 'right-0'
                }`}
            />

            <div
                className={`hidden sm:group-hover:flex absolute top-0 lg:w-[600px] z-10 ${
                    isLeft ? 'left-0 justify-start' : 'right-0 justify-end'
                }`}
            >
                <div className="max-w-full max-h-full w-96 h-96 2xl:w-[600px] 2xl:h-[600px] relative ">
                    <Image
                        src={`${BASE_URL}/${file.hash}`}
                        alt={file.name}
                        draggable={false}
                        objectFit="cover"
                        layout="fill"
                    />
                </div>
            </div>
        </div>
    );
};

export default GalleryImage;
