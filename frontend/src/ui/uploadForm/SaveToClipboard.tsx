import { LinkIcon } from '@heroicons/react/solid';
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

        navigator.clipboard.writeText(`https://kidala.life/gallery/${hash}`);

        setSavedToClipboard && setSavedToClipboard(true);
    };

    return (
        <Button
            onClick={saveToClipboard}
            className={`w-1/3 h-8 ${savedToClipboard ? 'ring-2' : ''}`}
            icon={<LinkIcon className="text-white h-5" />}
        >
            Copy link
        </Button>
    );
};

export default SaveToClipboard;
