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
            className="sm:mr-2 w-full sm:w-40"
            onClick={saveToClipboard}
            color="primary"
            icon={<LinkIcon className="text-white h-5" />}
        >
            Copy link
        </Button>
    );
};

export default SaveToClipboard;
