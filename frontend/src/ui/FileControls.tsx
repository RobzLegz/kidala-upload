import React, { useEffect, useState } from 'react';
import { FileInterface } from '../interfaces/file';
import {
    ArrowDownIcon,
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { likeFile, saveFile } from '../requests/fileRequests';
import {
    removeFromSaved,
    selectUser,
    UserInfo,
} from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { useRouter } from 'next/router';
import { getFileLikes, getFileUserLikes } from '../utils/getFileLikes';

export interface FileControlsProps {
    file?: FileInterface;
    className?: string;
}

const FileControls: React.FC<FileControlsProps> = ({ file, className }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const userInfo: UserInfo = useSelector(selectUser);

    const [givenLikes, setGivenLikes] = useState<number | null>(null);
    const [prevSentLikes, setPrevSentLikes] = useState<number | null>(null);
    const [saved, setSaved] = useState<boolean | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [prevSaved, setPrevSaved] = useState<boolean | null>(null);
    const [timer, setTimer] = useState<number | null>(null);
    const [tutorialDone, setTutorialDone] = useState<boolean>(true);
    const [tutorialStep, setTutorialStep] = useState<number>(1);
    const [limiter, setLimiter] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (userInfo.info) {
            setSaved(
                userInfo.info?.favourites?.some((f) => f === file?._id)
                    ? true
                    : false
            );

            setPrevSaved(
                userInfo.info?.favourites?.some((f) => f === file?._id)
                    ? true
                    : false
            );

            setGivenLikes(getFileUserLikes(file, userInfo.info._id));
        } else {
            setGivenLikes(0);
        }
    }, [userInfo.info, file]);

    const checkIfLogged = () => {
        if (
            userInfo.info &&
            userInfo.info.username &&
            userInfo.loggedIn &&
            userInfo.token
        ) {
            return true;
        }

        return false;
    };

    const handleSave = async () => {
        const logged = checkIfLogged();

        if (!logged) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'You must be logged in to save files',
                })
            );

            return;
        }

        if (saved === null || !file) {
            return;
        }

        setSaved(!saved);

        const makeIt = async () => {
            await saveFile({
                file_id: file?._id,
                dispatch,
                token: userInfo.token,
            });

            dispatch(removeFromSaved(file?._id));
        };

        if (limiter) {
            clearTimeout(limiter);
            setLimiter(null);
        }

        const timeout = setTimeout(makeIt, 3000);
        setLimiter(timeout);
    };

    return (
        <div
            className={`flex h-10 w-full items-center justify-between px-2 mt-1 relative ${
                className ? className : ''
            }`}
        >
            {userInfo.info?._id !== file?.author && (
                <div className="flex items-center justify-end w-full">
                    <button onClick={handleSave}>
                        {saved ? (
                            <BookmarkFullIcon className="text-notification-loading w-7" />
                        ) : (
                            <BookmarkIcon className="text-white w-7" />
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileControls;
