import React from 'react';
import { useDispatch } from 'react-redux';
import { clearNotification } from '../../redux/slices/notificationSlice';
import Button from '../Button';
import SaveToClipboard from './SaveToClipboard';

export interface UploadResponseProps {
    hash: string;
    savedToClipboard?: boolean;
    setSavedToClipboard?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadResponse: React.FC<UploadResponseProps> = ({
    hash,
    savedToClipboard,
    setSavedToClipboard,
}) => {
    const dispatch = useDispatch();

    const openUrl = (e: React.MouseEvent) => {
        e.preventDefault();

        setSavedToClipboard && setSavedToClipboard(false);

        window.open(`/gallery/${hash}`);
        dispatch(clearNotification());
    };

    return (
        <div className="w-full flex items-center justify-center flex-col mt-4">
            <p className="text-primary-200">File uploaded successfully 🚀</p>

            <div className="flex w-full justify-end items-center mt-2">
                <Button className="w-1/3 h-8 mr-2" onClick={openUrl} color="secondary">
                    Open
                </Button>

                <SaveToClipboard
                    savedToClipboard={savedToClipboard}
                    hash={hash}
                    setSavedToClipboard={setSavedToClipboard}
                />
            </div>
        </div>
    );
};
