import React from 'react';
import { useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import GalleryFile from './GalleryFile';

const GalleryGrid = () => {
    const appInfo: AppInfo = useSelector(selectApp);

    return (
        <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 px-0.5 gap-0.5 sm:gap-2">
            {appInfo.files &&
                appInfo.files.map((file, i) => (
                    <GalleryFile props={file} key={i} />
                ))}
        </div>
    );
};

export default GalleryGrid;
