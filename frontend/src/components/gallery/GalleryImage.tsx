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
    const [isTop, setIsTop] = useState(true);

    const checkPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { width, height } = windowSize;

        if (width) {
            if (e.clientX > width / 2) {
                setIsLeft(false);
            }

            if (height) {
                let imgHeight = 0;

                if (width >= 1536) {
                    imgHeight = 600;
                } else {
                    imgHeight = 384;
                }

                if(e.clientY + imgHeight > height){
                    setIsTop(false);
                }
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
                className={`hidden sm:group-hover:flex absolute lg:w-[600px] z-10 ${
                    isLeft ? 'left-0 justify-start' : 'right-0 justify-end'
                } ${isTop ? "top-0" : "bottom-0"}`}
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
