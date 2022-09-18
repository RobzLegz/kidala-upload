import {
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import {
    HeartIcon,
    BookmarkIcon,
    ArrowUpOnSquareIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import { useRouter } from 'next/router';

export interface GalleryFileProps {
    props: FileInterface;
    testLikes?: number;
    testShares?: number;
    testSaves?: number;
    testSaved?: boolean;
    testGivenLikes?: number;
}

const GalleryFile: React.FC<GalleryFileProps> = ({
    props,
    testSaves,
    testLikes,
    testShares,
    testSaved,
    testGivenLikes,
}) => {
    const router = useRouter();

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
        router.push(`/new/gallery/${props.hash}`);
    };

    return (
        <div className="bg-primary-800 w-full h-full flex items-center justify-center group relative rounded-lg overflow-hidden border border-primary-700 no_select">
            <div className="w-[200px] sm:w-[250px] md:w-[400px] h-[160px] sm:h-[200px] md:h-[250px] lg:h-[300px] max-w-full max-h-full relative">
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
            </div>

            <div
                className="absolute rounded-t-lg w-full top-0 left-0 h-full cursor-pointer"
                onClick={handleImageClick}
            />

            <div className="hidden sm:flex h-10 w-full items-center justify-between absolute bottom-0 rounded-b-lg z-10 transition-all duration-300 px-2 bg-transparent_dark translate-y-full group-hover:translate-y-0">
                <div className="flex items-center">
                    <div className="flex items-center mr-2">
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

                <div className="flex items-center justify-end">
                    

                    <button onClick={handleSave}>
                        {saved ? (
                            <BookmarkFullIcon className="text-notification-loading w-7" />
                        ) : (
                            <BookmarkIcon className="text-white w-7" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

{
    /* <div className="flex items-center mr-4">
    <button onClick={handleLike} className="flex items-center justify-center">
        {givenLikes > 0 ? (
            <HeartIconFull className="text-notification h-8" />
        ) : (
            <>
                <HeartIcon className="text-white h-8" />

                <p className="text-white no_select ml-0.5">{totalLikes}</p>
            </>
        )}
    </button>

    {givenLikes > 0 && (
        <button
            className="flex items-center justify-center ml-2"
            onClick={handleDislike}
        >
            <small className="text-notification border-white no_select">
                {givenLikes}
            </small>

            <p className="text-white mx-2">|</p>

            <small className="text-white no_select">{totalLikes}</small>
        </button>
    )}
</div>; */
}

export default GalleryFile;
