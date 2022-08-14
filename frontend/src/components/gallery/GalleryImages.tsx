import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';
import useWindowSize from '../hooks/useWindowSize';
import GalleryImage from './GalleryImage';

function GalleryImages() {
    const dispatch = useDispatch();
    const router = useRouter();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
            {appInfo.files &&
                appInfo.files.map((file) => (
                    <GalleryImage file={file} key={file.name} />
                ))}
        </div>
    );
}

export default GalleryImages;
