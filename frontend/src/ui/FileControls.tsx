import React, { useState } from 'react';
import { FileInterface } from '../interfaces/file';
import {
    ArrowDownTrayIcon,
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon, LinkIcon } from '@heroicons/react/24/outline';

export interface FileControlsProps {
    file?: FileInterface;
}

const FileControls: React.FC<FileControlsProps> = ({ file }) => {
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

    return (
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
    );
};

export default FileControls;
