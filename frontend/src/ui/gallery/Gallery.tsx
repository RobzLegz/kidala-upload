import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import {
    AppInfo,
    selectApp,
    setSortOptions,
} from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getFilesV2, getLiked, getSaved } from '../../requests/fileRequests';
import Checkbox from '../Checkbox';
import GalleryGrid from './GalleryGrid';
import GallerySpinner from './GallerySpinner';

export interface GalleryProps {
    liked?: boolean;
    saved?: boolean;
    user?: boolean;
}

const limit = 24;

const Gallery: React.FC<GalleryProps> = ({
    liked = false,
    saved = false,
    user = false,
}) => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [prevCursor, setPrevCursor] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeFiles, setActiveFiles] = useState(appInfo.files);
    const [activeFileLen, setActiveFileLen] = useState(appInfo.db_file_len);

    useEffect(() => {
        if (saved && userInfo.info) {
            setActiveFiles(userInfo.savedFiles ? userInfo.savedFiles : []);
            setActiveFileLen(
                userInfo.info?.favourites.length
                    ? userInfo.info?.favourites.length
                    : 0
            );
            setPrevCursor(userInfo.savedFiles ? userInfo.savedFiles.length : 0);
            dispatch(
                setSortOptions({
                    ...appInfo.sortOptions,
                    showFiles: true,
                })
            );
        } else if (appInfo.files) {
            setActiveFiles(appInfo.files);
            setPrevCursor(0);
            setActiveFileLen(appInfo.db_file_len);
        }
    }, [liked, saved, userInfo.info, userInfo.savedFiles, appInfo.files]);

    const handleScroll = () => {
        if (
            !isServer &&
            windowSize.height &&
            activeFiles &&
            activeFiles.length < activeFileLen - 1 &&
            limit &&
            activeFiles.length !== prevCursor &&
            prevCursor !== 0
        ) {
            if (windowSize.height) {
                const docHeight = document.documentElement.scrollHeight;
                const scrollTop = document.documentElement.scrollTop;

                if (windowSize.height + scrollTop + 1 >= docHeight) {
                    setLoading(true);
                    const fetchFiles = async () => {
                        setPrevCursor(activeFiles.length - 1);

                        if (saved) {
                            if (!userInfo.token) {
                                return;
                            }

                            await getSaved({
                                cursor: activeFiles.length,
                                limit: limit,
                                dispatch,
                                token: userInfo.token,
                            });
                        } else if (liked) {
                            if (!userInfo.token) {
                                return;
                            }

                            await getLiked({
                                cursor: activeFiles.length,
                                limit: limit,
                                dispatch,
                                token: userInfo.token,
                            });
                        } else {
                            await getFilesV2({
                                cursor: activeFiles.length,
                                limit: limit,
                                dispatch,
                            });
                        }
                    };

                    fetchFiles().then(() => {
                        setLoading(false);
                    });
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [windowSize.height, activeFiles, limit, activeFileLen]);

    const changeCheckbox = () => {
        dispatch(
            setSortOptions({
                ...appInfo.sortOptions,
                showFiles: !appInfo.sortOptions.showFiles,
            })
        );
    };

    return (
        <div
            className={`w-full flex flex-col items-start justify-start ${
                !saved && !liked && 'px-2 sm:px-2 xl:px-16 2xl:px-52'
            }`}
        >
            {!liked && !saved && (
                <Checkbox
                    text="Show all file types"
                    checked={appInfo.sortOptions.showFiles}
                    onClick={changeCheckbox}
                />
            )}

            <GalleryGrid
                activeFiles={activeFiles}
                liked={liked}
                saved={saved}
            />

            {loading && <GallerySpinner />}
        </div>
    );
};

export default Gallery;
