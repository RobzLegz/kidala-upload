import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { LinkIcon } from '@heroicons/react/24/outline';
import { default as OptImage } from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import { FileInterface } from '../../interfaces/file';
import { User } from '../../interfaces/user';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { detectFileType } from '../../utils/detectFileType';
import Button from '../Button';
import FileControls from '../FileControls';
import FileInfoControls from '../FileInfoControls';
import ProfileUserIcon from '../profile/ProfileUserIcon';
import Spinner from '../Spinner';
import { BASE_URL } from './../../requests/routes';
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';

export interface GalleryInfoInsertProps
    extends React.ComponentPropsWithRef<'div'> {
    colspan: number;
    fileInfo: FileInterface;
}
const GalleryInfoInsert: React.FC<GalleryInfoInsertProps> = ({
    fileInfo,
    colspan,
    ...props
}) => {
    const cn = `${
        colspan === 3 ? 'col-span-3' : 'col-span-4'
    } rounded-lg flex flex-col items-center justify-center p-2 ${
        props.className ? props.className : ''
    }`;

    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });
    const [loading, setLoading] = useState(true);
    const [fileUser, setFileUser] = useState<User | null>(null);

    const fileSource = `${BASE_URL}/files/${fileInfo.hash}/${fileInfo.name}`;

    useEffect(() => {
        if (fileInfo && detectFileType(fileInfo.name) === 'image') {
            setLoading(true);

            const img = new Image();
            img.src = fileSource;
            img.onload = () => {
                const { width, height } = img;

                let nH = 0;
                let nW = 600;
                let w_c_p = ((nW - width) / width) * 100;
                let f_w_c_p = Math.floor(w_c_p) / 100;
                let hDiff = height * f_w_c_p;

                nH = height + hDiff;

                while (nH > Number(windowSize.height) - 400) {
                    nW -= 50;

                    w_c_p = ((nW - width) / height) * 100;
                    f_w_c_p = Math.floor(w_c_p) / 100;
                    hDiff = height * f_w_c_p;

                    nH = height + hDiff;
                }

                setImageDimensions({
                    width: nW,
                    height: nH,
                });
            };
        }
    }, [fileInfo]);

    useEffect(() => {
        setFileUser(null);

        const user = appInfo.collectedUsers.find(
            (u) => u._id === fileInfo.author
        );

        if (user) {
            setFileUser(user);
        } else if (
            userInfo.info &&
            userInfo.info.username &&
            fileInfo.author === userInfo.info?._id
        ) {
            setFileUser(userInfo.info);
        } else {
        }
    }, [fileInfo, appInfo.collectedUsers]);

    if (detectFileType(fileInfo.name) === 'audio') {
        return (
            <div className={cn}>
                <AudioPlayer file={fileInfo} insert />
            </div>
        );
    } else if (detectFileType(fileInfo.name) === 'video') {
        return (
            <div className={cn}>
                <VideoPlayer file={fileInfo} insert />
            </div>
        );
    }

    return (
        <div className={cn} {...props}>
            <div className="flex flex-col rounded-lg items-center justify-start w-full max-w-[600px] bg-primary-800 border border-primary-700 p-2">
                {detectFileType(fileInfo.name) === 'image' ? (
                    <div className="relative group overflow-hidden">
                        <OptImage
                            src={fileSource}
                            width={imageDimensions.width}
                            height={imageDimensions.height}
                            draggable={false}
                            placeholder="empty"
                            className="rounded-lg"
                            onLoad={() => setLoading(false)}
                            onLoadStart={() => setLoading(true)}
                        />

                        <div
                            className={`w-full absolute bottom-0 left-0 bg-transparent_dark transition-transform duration-300 items-center justify-start px-4 py-1 translate-y-full group-hover:-translate-y-1.5 rounded-b-lg z-10`}
                        >
                            <button className="flex items-center justify-center cursor-pointer">
                                <ProfileUserIcon
                                    avatar={
                                        fileUser?.avatar
                                            ? fileUser.avatar
                                            : undefined
                                    }
                                    showAvatar
                                />

                                <strong className="ml-2 text-white text-lg">
                                    {fileUser ? fileUser.username : 'Anonymous'}
                                </strong>
                            </button>
                        </div>

                        <div
                            className={`absolute left-0 -top-1 flex items-center justify-center bg-transparent_dark rounded-lg w-full h-full transition-opacity duration-300 ${
                                loading ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <Spinner size="8" />
                        </div>
                    </div>
                ) : null}

                <FileControls file={fileInfo} />

                <FileInfoControls file={fileInfo} />
            </div>
        </div>
    );
};
export default GalleryInfoInsert;
