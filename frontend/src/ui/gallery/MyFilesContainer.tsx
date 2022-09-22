import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getFilesV2 } from '../../requests/fileRequests';
import { getUserFiles } from '../../requests/userRequests';

const MyFilesContainer = () => {
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

                await getUserFiles({
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

    return <div>MyFilesContainer</div>;
};

export default MyFilesContainer;
