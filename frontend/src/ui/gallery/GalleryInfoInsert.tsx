import {
    ArrowDownTrayIcon,
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { default as OptImage } from 'next/image';
import React, { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { FileInterface } from '../../interfaces/file';
import { detectFileType } from '../../utils/detectFileType';
import Button from '../Button';
import Spinner from '../Spinner';
import { BASE_URL } from './../../requests/routes';

export interface GalleryInfoInsertProps
    extends React.ComponentPropsWithRef<'div'> {
    colspan: number;
    fileInfo: FileInterface;
}
const GalleryInfoInsert: React.FC<GalleryInfoInsertProps> = ({
    fileInfo,
    colspan,
    ...props
}) => {
    const windowSize = useWindowSize();

    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [totalLikes, setTotalLikes] = useState(0);
    const [givenLikes, setGivenLikes] = useState(0);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const fileSource = `${BASE_URL}/files/${fileInfo.hash}/${fileInfo.name}`;

    useEffect(() => {
        if (fileInfo && detectFileType(fileInfo.name) === 'image') {
            setLoading(true);

            const img = new Image();
            img.src = fileSource;
            img.onload = () => {
                const { width, height } = img;

                let nH = 0;
                let nW = 600;
                let w_c_p = ((nW - width) / width) * 100;
                let f_w_c_p = Math.floor(w_c_p) / 100;
                let hDiff = height * f_w_c_p;

                nH = height + hDiff;

                while (nH > Number(windowSize.height) - 400) {
                    nW -= 20;

                    w_c_p = ((nW - width) / height) * 100;
                    f_w_c_p = Math.floor(w_c_p) / 100;
                    hDiff = height * f_w_c_p;

                    nH = height + hDiff;
                }

                setImageDimensions({
                    width: nW,
                    height: nH,
                });
            };
        }
    }, [fileInfo]);

    return (
        <div
            className={`${
                colspan === 3 ? 'col-span-3' : 'col-span-4'
            } rounded-lg flex flex-col items-center justify-center p-2 ${
                props.className ? props.className : ''
            }`}
            {...props}
        >
            <div className="flex flex-col rounded-lg items-center justify-start w-full max-w-[600px] bg-primary-800 border border-primary-700 p-2">
                {detectFileType(fileInfo.name) === 'image' ? (
                    <div className="relative">
                        <OptImage
                            src={fileSource}
                            width={imageDimensions.width}
                            height={imageDimensions.height}
                            draggable={false}
                            placeholder="empty"
                            className="rounded-lg"
                            onLoad={() => setLoading(false)}
                            onLoadStart={() => setLoading(true)}
                        />

                        <div
                            className={`absolute left-0 -top-1 flex items-center justify-center bg-transparent_dark rounded-lg w-full h-full transition-opacity duration-300 ${
                                loading ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Spinner size="8" />
                        </div>
                    </div>
                ) : null}

                <div className="hidden sm:flex h-10 w-full items-center justify-between px-2 mt-1">
                    <div className="flex items-center w-full">
                        <div className="flex items-center mr-2 w-28">
                            <button
                                className="flex items-center justify-center text-notification no_select"
                                onClick={handleLike}
                            >
                                <HeartIconFull className="text-notification h-6 mr-0.5" />

                                {givenLikes}
                            </button>

                            <div className="h-7 w-[1.5px] bg-white mx-2" />

                            <button
                                className="flex items-center justify-center text-white no_select"
                                onClick={handleDislike}
                            >
                                <HeartIcon className="text-white h-6 mr-0.5" />

                                {totalLikes}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end w-28">
                        <button onClick={handleSave}>
                            {saved ? (
                                <BookmarkFullIcon className="text-notification-loading w-7" />
                            ) : (
                                <BookmarkIcon className="text-white w-7" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="w-full p-2 flex-col items-start justify-start bg-primary-900 mt-1 rounded-lg border border-primary-700">
                    <p className="text-white text-xs">
                        <span className="text-sm">{fileInfo.name}</span>
                        {fileInfo.description
                            ? ` - ${fileInfo.description}`
                            : ''}
                    </p>

                    <div className="w-full justify-start flex items-center">
                        <div className="w-56 flex items-center justify-center mt-2">
                            <Button
                                className="flex-1 mr-1"
                                size="small"
                                icon={
                                    <ArrowDownTrayIcon className="text-white h-5" />
                                }
                            >
                                Download
                            </Button>

                            <Button
                                className="flex-1 ml-1"
                                size="small"
                                icon={<LinkIcon className="text-white h-5" />}
                            >
                                Copy url
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GalleryInfoInsert;
