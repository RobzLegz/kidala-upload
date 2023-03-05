import { LinkIcon } from '@heroicons/react/20/solid';
import React from 'react';
import Button from '../Button';
import { UploadResponseProps } from './UploadResponse';

const SaveToClipboard: React.FC<UploadResponseProps> = ({
    hash,
    savedToClipboard,
    setSavedToClipboard,
}) => {
    const saveToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();

        navigator.clipboard.writeText(`https://kidala.life/gallery?f=${hash}`);

        setSavedToClipboard && setSavedToClipboard(true);
    };

    return (
        <Button
            onClick={saveToClipboard}
            icon={<LinkIcon className="text-white h-5" />}
            className={`w-full sm:w-40 ${savedToClipboard ? 'ring-2' : ''}`}
        >
            Copy link
        </Button>
    );
};

export default SaveToClipboard;
