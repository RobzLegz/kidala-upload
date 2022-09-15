import React from 'react';
import { useDispatch } from 'react-redux';
import { clearNotification } from '../../redux/slices/notificationSlice';
import SquareButton from '../SquareButton';
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
        <div className="w-full flex items-center justify-center flex-col">
            <p className="text-primary-200">File uploaded successfully 🚀</p>

            <SquareButton className="w-48 h-8 mt-4" onClick={openUrl}>
                Open
            </SquareButton>

            <SaveToClipboard
                savedToClipboard={savedToClipboard}
                hash={hash}
                setSavedToClipboard={setSavedToClipboard}
            />
        </div>
    );
};
