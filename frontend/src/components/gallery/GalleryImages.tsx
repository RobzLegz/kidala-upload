import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';

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
        <div className="mt-10 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
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
                            className="w-full h-full flex items-center justify-center group relative"
                            key={file.name}
                        >
                            <img
                                src={`${BASE_URL}/${file.hash}`}
                                className="object-cover w-full h-full"
                                alt={file.name}
                                draggable={false}
                            />

                            <div className="absolute left-0 top-0 w-full h-full z-20" />

                            <div
                                className="hidden group-hover:flex absolute left-0 top-0 lg:w-[600px] z-10 cursor-pointer"
                                onClick={() =>
                                    router.push(`/files/${file.hash}`)
                                }
                            >
                                <div className="w-full">
                                    <img
                                        src={file.hash}
                                        className="object-cover w-full"
                                        alt={file.name}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default GalleryImages;
