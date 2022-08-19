import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getAllFiles } from '../../requests/adminRequests';
import GalleryImage from './GalleryImage';

function GalleryImages() {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="">
            <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                {appInfo.files &&
                    appInfo.files.map((file, i) => {
                        if (appInfo.previewIdx && i <= appInfo.previewIdx) {
                            return null;
                        }

                        return <GalleryImage file={file} index={i} key={i} />;
                    })}
            </div>

            {appInfo.previewIdx &&
            appInfo.files &&
            appInfo.files.length !== appInfo.previewIdx + 1 ? (
                <div className="flex w-full items-center justify-start py-2 border-b-2 border-dashed border-white">
                    <strong className="text-white">Seen:</strong>
                </div>
            ) : null}

            <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                {appInfo.files &&
                    appInfo.previewIdx &&
                    appInfo.files.map((file, i) => {
                        if (appInfo.previewIdx && i > appInfo.previewIdx) {
                            return null;
                        }

                        return <GalleryImage file={file} index={i} key={i} />;
                    })}
            </div>
        </div>
    );
}

export default GalleryImages;
