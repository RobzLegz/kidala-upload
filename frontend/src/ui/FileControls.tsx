import React, { useEffect, useState } from 'react';
import { FileInterface } from '../interfaces/file';
import {
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { likeFile, saveFile } from '../requests/fileRequests';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/slices/notificationSlice';
import { getFileLikes, getFileUserLikes } from '../utils/getFileLikes';

export interface FileControlsProps {
    file?: FileInterface;
    className?: string;
}

const FileControls: React.FC<FileControlsProps> = ({ file, className }) => {
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    const [totalLikes, setTotalLikes] = useState<number | null>(null);
    const [givenLikes, setGivenLikes] = useState<number | null>(null);
    const [prevGivenLikes, setPrevGivenLikes] = useState<number | null>(null);
    const [prevSentLikes, setPrevSentLikes] = useState<number | null>(null);
    const [saved, setSaved] = useState<boolean | null>(null);
    const [sent, setSent] = useState<boolean>(false);
    const [prevSaved, setPrevSaved] = useState<boolean | null>(null);
    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
        if (totalLikes === null && file) {
            setTotalLikes(getFileLikes(file));
        }

        if (givenLikes === null && userInfo.info && userInfo.info._id) {
            setGivenLikes(getFileUserLikes(file, userInfo.info._id));
        }

        if (saved === null && userInfo.info) {
            setSaved(
                userInfo.info?.favourites?.some((f) => f === file?._id)
                    ? true
                    : false
            );
        }

        if (prevSaved === null && userInfo.info) {
            setPrevSaved(
                userInfo.info?.favourites?.some((f) => f === file?._id)
                    ? true
                    : false
            );
        }
    }, [userInfo.info, file]);

    const checkIfLogged = () => {
        if (userInfo.info && userInfo.info.username && userInfo.loggedIn) {
            return true;
        }

        return false;
    };

    const handleSave = () => {
        if (!checkIfLogged) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'You must be logged in to save files',
                })
            );

            return;
        }

        if (saved === null) {
            return;
        }

        const newSaved = !saved;

        setSaved(newSaved);

        setTimer(3);
    };

    useEffect(() => {
        const makeReq = async () => {
            await saveFile({
                file_id: file?._id,
                dispatch,
                token: userInfo.token,
            });

            // console.log(timer)
        };

        const send = async () => {
            if (prevSaved !== saved) {
                await makeReq().then(() => {
                    setPrevSaved(saved);
                });
            }
        };

        const timeoutEffect = () => {
            if (typeof timer === 'number') {
                setTimeout(() => {
                    if (timer > 0) {
                        setTimer(timer - 1);
                    } else {
                        send();
                    }
                }, 1000);
            }
        };

        timeoutEffect();

        return () => undefined;
    }, [timer]);

    const handleLike = () => {
        if (!checkIfLogged) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'You must be logged in to like files',
                })
            );

            return;
        }

        setGivenLikes(Number(givenLikes) + 1);
        setTotalLikes(Number(totalLikes) + 1);

        setTimeout(() => {
            setPrevGivenLikes(Number(givenLikes) + 1);
            setSent(false);
        }, 3000);
    };

    const handleDislike = () => {
        if (!checkIfLogged) {
            dispatch(
                setNotification({
                    type: 'error',
                    message: 'You must be logged in to dislike files',
                })
            );

            return;
        }

        if (Number(givenLikes) > 0) {
            setGivenLikes(Number(givenLikes) - 1);
            setTotalLikes(Number(totalLikes) - 1);

            setTimeout(() => {
                setPrevGivenLikes(Number(givenLikes) - 1);
                setSent(false);
            }, 3000);
        }
    };

    useEffect(() => {
        const makeReq = async () => {
            await likeFile({
                user_id: userInfo.info?._id,
                file_id: file?._id,
                count: Number(givenLikes),
                dispatch,
                token: userInfo.token,
            });
        };

        const send = async () => {
            if (
                prevGivenLikes === givenLikes &&
                !sent &&
                prevSentLikes !== givenLikes
            ) {
                setSent(true);
                await makeReq().then(() => {
                    setPrevSentLikes(givenLikes);
                });
            }
        };

        const timeoutEffect = () => {
            setTimeout(() => {
                send();
            }, 3000);
        };

        timeoutEffect();

        return () => undefined;
    }, [prevGivenLikes]);

    return (
        <div
            className={`flex h-10 w-full items-center justify-between px-2 mt-1 ${
                className ? className : ''
            }`}
        >
            <div className="flex items-center w-full">
                <div className="flex items-center mr-2 w-28">
                    {userInfo.info?._id !== file?.author && (
                        <>
                            <button
                                className="flex items-center justify-center text-notification no_select"
                                onClick={handleLike}
                            >
                                <HeartIconFull className="text-notification h-6 mr-0.5" />

                                {givenLikes}
                            </button>

                            <div className="h-7 w-[1.5px] bg-white mx-2" />
                        </>
                    )}

                    <button
                        className="flex items-center justify-center text-white no_select"
                        onClick={handleDislike}
                        disabled={userInfo.info?._id === file?.author}
                    >
                        <HeartIcon className="text-white h-6 mr-0.5" />

                        {totalLikes}
                    </button>
                </div>
            </div>

            {userInfo.info?._id !== file?.author && (
                <div className="flex items-center justify-end w-28">
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
