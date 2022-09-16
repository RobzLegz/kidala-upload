import { ClipboardCopyIcon } from '@heroicons/react/solid';
import React from 'react';
import { UploadResponseProps } from './UploadResponse';

const SaveToClipboard: React.FC<UploadResponseProps> = ({
    hash,
    savedToClipboard,
    setSavedToClipboard,
}) => {
    const saveToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();

        navigator.clipboard.writeText(`https://kidala.life/gallery/${hash}`);

        setSavedToClipboard && setSavedToClipboard(true);
    };

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <button
                className={`flex w-full max-w-[300px] pl-4 transition-all duration-200 bg-primary-300 hover:bg-primary-400 items-center justify-center mt-4 ${
                    savedToClipboard ? 'ring-2' : ''
                }`}
                onClick={saveToClipboard}
            >
                <p className="text-white text-center truncate flex-1 font-mono">
                    https://kidala.life/gallery/{hash}
                </p>

                <div className="h-10 flex items-center justify-center w-11 border-blue-300 bg-primary-700">
                    <ClipboardCopyIcon className="text-white h-6" />
                </div>
            </button>

            <small className="mt-1 text-accent">
                {savedToClipboard ? 'Link copied' : 'Click to copy'}
            </small>
        </div>
    );
};

export default SaveToClipboard;
