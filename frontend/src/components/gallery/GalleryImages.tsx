import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';

function GalleryImages() {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="mt-10 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
            {appInfo.files &&
                appInfo.files.map((file) => {
                    if (
                        !file.name.includes('.png') &&
                        !file.name.includes('.jpg') &&
                        !file.name.includes('.gif') &&
                        !file.name.includes('.jpeg') &&
                        !file.name.includes('.svg') &&
                        !file.name.includes('.webp')
                    ) {
                        return null;
                    }

                    return (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            key={file.name}
                        >
                            <img
                                src={`${BASE_URL}/${file.hash}`}
                                className="object-cover w-full h-full"
                                alt={file.name}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default GalleryImages;
