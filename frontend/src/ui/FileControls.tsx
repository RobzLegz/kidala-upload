import React, { useEffect, useState } from 'react';
import { FileInterface } from '../interfaces/file';
import {
    BookmarkIcon as BookmarkFullIcon,
    HeartIcon as HeartIconFull,
} from '@heroicons/react/20/solid';
import { HeartIcon, BookmarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { likeFile } from '../requests/fileRequests';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export interface FileControlsProps {
    file?: FileInterface;
    className?: string;
}

const FileControls: React.FC<FileControlsProps> = ({ file, className }) => {
    const dispatch = useDispatch();

    const userInfo: UserInfo = useSelector(selectUser);

    const [totalLikes, setTotalLikes] = useState(0);
    const [givenLikes, setGivenLikes] = useState(0);
    const [prevGivenLikes, setPrevGivenLikes] = useState<number | null>(null);
    const [prevSentLikes, setPrevSentLikes] = useState<number | null>(null);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState<boolean>(false);

    const handleSave = () => {
        setSaved(!saved);
    };

    const checkIfLogged = () => {
        if (userInfo.info && userInfo.info.username && userInfo.loggedIn) {
            return;
        }
    };

    const handleLike = () => {
        setGivenLikes(givenLikes + 1);
        setTotalLikes(totalLikes + 1);

        setTimeout(() => {
            setPrevGivenLikes(givenLikes + 1);
            console.log('gave: ', givenLikes + 1);
            setSent(false);
        }, 3000);
    };

    const handleDislike = () => {
        if (givenLikes > 0) {
            setGivenLikes(givenLikes - 1);
            setTotalLikes(totalLikes - 1);

            setTimeout(() => {
                setPrevGivenLikes(givenLikes - 1);
                console.log('gave: ', givenLikes - 1);
                setSent(false);
            }, 3000);
        }
    };

    useEffect(() => {
        const makeReq = async () => {
            await likeFile({
                user_id: userInfo.info?._id,
                file_id: file?._id,
                count: givenLikes,
                dispatch,
                token: userInfo.token
            });
        };

        const send = () => {
            if (
                prevGivenLikes === givenLikes &&
                !sent &&
                prevSentLikes !== givenLikes
            ) {
                setSent(true);
                makeReq().then(() => {
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
