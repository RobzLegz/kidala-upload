import React from 'react';
import { useDispatch } from 'react-redux';
import { clearNotification } from '../../redux/slices/notificationSlice';
import Button from '../Button';
import SaveToClipboard from './SaveToClipboard';

export interface UploadResponseProps {
    hash: string;
    savedToClipboard?: boolean;
    setHash?: React.Dispatch<React.SetStateAction<string>>;
    setSavedToClipboard?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadResponse: React.FC<UploadResponseProps> = ({
    hash,
    setHash,
    savedToClipboard,
    setSavedToClipboard,
}) => {
    const dispatch = useDispatch();

    const openUrl = (e: React.MouseEvent) => {
        e.preventDefault();

        setSavedToClipboard && setSavedToClipboard(false);

        window.open(`new/gallery?=${hash}`);
        dispatch(clearNotification());
    };

    return (
        <div className="w-full bg-primary-800 p-4 flex items-center justify-start flex-col border border-primary-700 rounded-lg">
            <strong className="mb-4 text-primary-100 text-lg">
                Your file has been uploaded 🚀
            </strong>

            <div className="w-full flex items-center justify-center mt-2">
                <Button
                    className="mr-2 w-40"
                    onClick={() => setHash && setHash('')}
                    color="primary-300"
                >
                    Upload more
                </Button>

                <Button className="mr-2" onClick={openUrl} color="secondary">
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
