import { DocumentIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp, setPreviewIdx } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { AdIndicator } from '../ads/AdIndicator';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { windwSizes } from '../../constants/windowSizes';

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

    const [isLeft, setIsLeft] = useState(true);
    const [isTop, setIsTop] = useState<boolean | null>(true);

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

    const checkPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { width, height } = windowSize;

        if (width) {
            if (e.clientX > width / 2) {
                setIsLeft(false);
            } else {
                setIsLeft(true);
            }

            if (height && appInfo.files) {
                let imgIdx = index + 1;
                let fileLen = appInfo.files.length;

                let colCount = 0;

                const colSize5 = windwSizes.lg;
                const colSize7 = windwSizes['2xl'];

                if (width >= colSize7) {
                    colCount = 10;
                } else if (width >= colSize5) {
                    colCount = 8;
                } else {
                    setIsTop(null);
                    return;
                }

                if (!isSeen) {
                    if (appInfo.previewIdx) {
                        imgIdx -= appInfo.previewIdx;
                        fileLen -= appInfo.previewIdx;
                    }

                    if (fileLen < colCount) {
                        setIsTop(null);
                        return;
                    }

                    if (imgIdx <= colCount + 1) {
                        setIsTop(true);
                        return;
                    }

                    if (imgIdx + colCount >= fileLen) {
                        setIsTop(false);
                    } else {
                        setIsTop(true);
                    }
                } else {
                    setIsTop(null);
                }
            }
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

    if (
        !file.name.includes('.png') &&
        !file.name.includes('.jpg') &&
        !file.name.includes('.gif') &&
        !file.name.includes('.jpeg') &&
        !file.name.includes('.svg') &&
        !file.name.includes('.jfif') &&
        !file.name.includes('.webp')
    ) {
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
                onMouseOver={checkPosition}
            >
                <div className="w-[250px] md:w-[300px] h-[200px] md:h-[250px] lg:h-[300px] max-w-full max-h-full relative flex flex-col items-center justify-center">
                    <DocumentIcon className="text-white h-16" />

                    <p className="text-white w-full truncate text-center">
                        {file.name}
                    </p>
                </div>

                <div
                    className={`absolute top-0 w-full h-full z-20 ${
                        isLeft ? 'left-0' : 'right-0'
                    }`}
                />
            </div>
        );
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center group relative cursor-pointer"
            onClick={viewFile}
            onMouseOver={checkPosition}
        >
            {file.is_ad ? <AdIndicator /> : null}

            <div className="w-[250px] md:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] 2xl:h-[400px]  max-w-full max-h-full relative">
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

            {/* <div
                className={`absolute top-0 w-full h-full z-20 ${
                    isLeft ? 'left-0' : 'right-0'
                }`}
            /> */}

            {/* {isTop !== null &&
            router.pathname !== '/my-files' &&
            router.pathname !== '/my-files/[hash]' ? (
                <div
                    className={`hidden sm:group-hover:flex absolute lg:w-[600px] z-10 ${
                        isLeft ? 'left-0 justify-start' : 'right-0 justify-end'
                    } ${isTop ? 'top-0' : 'bottom-0'}`}
                >
                    <div className="max-w-full max-h-full w-96 h-96 2xl:w-[600px] 2xl:h-[600px] relative ">
                        <Image
                            src={`${BASE_URL}/${file.hash}`}
                            alt={file.name}
                            draggable={false}
                            objectFit="cover"
                            layout="fill"
                            quality={80}
                            blurDataURL={`${BASE_URL}/${file.hash}`}
                            placeholder="blur"
                        />
                    </div>
                </div>
            ) : null} */}
        </div>
    );
};

export default GalleryImage;
