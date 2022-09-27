import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import {
    AppInfo,
    selectApp,
    setSortOptions,
} from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getFilesV2, getLiked } from '../../requests/fileRequests';
import Checkbox from '../Checkbox';
import GalleryGrid from './GalleryGrid';
import GallerySpinner from './GallerySpinner';

export interface GalleryProps {
    liked?: boolean;
    saved?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ liked = false, saved = false }) => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [limit, setLimit] = useState<number | null>(null); //amount of files to receive
    const [prevCursor, setPrevCursor] = useState(0); //amount of files previously received
    const [loading, setLoading] = useState(true); //start to receive from here
    const [activeFiles, setActiveFiles] = useState(appInfo.files);
    const [activeFileLen, setActiveFileLen] = useState(appInfo.db_file_len);

    useEffect(() => {
        if (liked) {
            setActiveFiles(userInfo.likedFiles);
            setActiveFileLen(
                userInfo.info?.likes.length ? userInfo.info?.likes.length : 0
            );
            dispatch(
                setSortOptions({
                    ...appInfo.sortOptions,
                    showFiles: true,
                })
            );
            setLoading(true);
        } else if (saved) {
            setActiveFiles(userInfo.savedFiles);
            setActiveFileLen(
                userInfo.info?.favourites.length
                    ? userInfo.info?.favourites.length
                    : 0
            );
            dispatch(
                setSortOptions({
                    ...appInfo.sortOptions,
                    showFiles: true,
                })
            );
            setLoading(true);
        } else {
            setActiveFiles(appInfo.files);
        }
    }, [liked, saved, userInfo.info, userInfo.likedFiles, userInfo.savedFiles]);

    const handleScroll = () => {
        if (windowSize.height) {
            const docHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;

            if (windowSize.height + scrollTop + 1 >= docHeight) {
                setLoading(true);
            }
        }
    };

    useEffect(() => {
        if (windowSize.width) {
            if (windowSize.width < windowSizes.xl) {
                setLimit(9);
            } else if (windowSize.width >= windowSizes.xl) {
                setLimit(12);
            }
        }
    }, [windowSize.width]);

    useEffect(() => {
        if (activeFiles && loading) {
            const fetchFiles = async () => {
                if (!activeFiles || !limit) {
                    return;
                }

                if (activeFiles.length === prevCursor) {
                    return;
                }

                setPrevCursor(activeFiles.length);

                if (saved) {
                } else if (liked) {
                    await getLiked({
                        cursor: activeFiles.length,
                        limit: limit,
                        dispatch,
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
    }, [activeFiles, loading]);

    useEffect(() => {
        if (
            !isServer &&
            windowSize.height &&
            activeFiles &&
            activeFiles.length < activeFileLen &&
            limit
        ) {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
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
                !saved && !liked && 'sm:px-2 xl:px-16 2xl:px-52'
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
