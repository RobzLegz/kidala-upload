import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import { isServer } from '../../lib/isServer';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getFilesV2 } from '../../requests/fileRequests';
import Spinner from '../Spinner';
import GalleryFile from './GalleryFile';
import GallerySpinner from './GallerySpinner';

const Gallery = () => {
    const dispatch = useDispatch();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);

    const [limit, setLimit] = useState(9); //amount of files to receive
    const [prevLimit, setPrevLimit] = useState(9); //amount of files to receive
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
        if (appInfo.files && loading) {
            const fetchFiles = async () => {
                if (!appInfo.files) {
                    return;
                }

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
            appInfo.files.length < appInfo.db_file_len
        ) {
            window.addEventListener('scroll', handleScroll);

            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [windowSize.height, appInfo.files]);

    useEffect(() => {
        if(!appInfo.files){
            setLoading(true);

            const fetchFiles = async () => {
                await getFilesV2({
                    cursor: 0,
                    limit: 15,
                    dispatch,
                });
            };

            fetchFiles().then(() => {
                setLoading(false);
            });
        }
    }, [appInfo.files])

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                {appInfo.files &&
                    appInfo.files.map((file, i) => (
                        <GalleryFile props={file} key={i} />
                    ))}
            </div>

            {loading && <GallerySpinner />}
        </div>
    );
};

export default Gallery;
