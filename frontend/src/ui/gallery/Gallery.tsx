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
import { getFilesV2 } from '../../requests/fileRequests';
import Checkbox from '../Checkbox';
import GalleryGrid from './GalleryGrid';
import GallerySpinner from './GallerySpinner';

const Gallery = () => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);

    const [limit, setLimit] = useState<number | null>(null); //amount of files to receive
    const [prevCursor, setPrevCursor] = useState(0); //amount of files previously received
    const [loading, setLoading] = useState(true); //start to receive from here

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
        if (appInfo.files && loading) {
            const fetchFiles = async () => {
                if (!appInfo.files || !limit) {
                    return;
                }

                if (appInfo.files.length === prevCursor) {
                    return;
                }

                setPrevCursor(appInfo.files.length);

                await getFilesV2({
                    cursor: appInfo.files.length,
                    limit: limit,
                    dispatch,
                });
            };

            fetchFiles().then(() => {
                setLoading(false);
            });
        }
    }, [appInfo.files, loading]);

    useEffect(() => {
        if (
            !isServer &&
            windowSize.height &&
            appInfo.files &&
            appInfo.files.length < appInfo.db_file_len &&
            limit
        ) {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [windowSize.height, appInfo.files, limit]);

    const changeCheckbox = () => {
        dispatch(
            setSortOptions({
                ...appInfo.sortOptions,
                showFiles: !appInfo.sortOptions.showFiles,
            })
        );
    };

    return (
        <div className="w-full flex flex-col items-start justify-center sm:px-2 xl:px-16 2xl:px-52">
            <Checkbox
                text="Show all file types"
                checked={appInfo.sortOptions.showFiles}
                onClick={changeCheckbox}
            />

            <GalleryGrid />

            {loading && <GallerySpinner />}
        </div>
    );
};

export default Gallery;
