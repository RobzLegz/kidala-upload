import Image from 'next/image';
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
        <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
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
                            className="w-full h-full flex items-center justify-center group relative cursor-pointer"
                            key={file.name}
                            onClick={() => router.push(`/gallery/${file.hash}`)}
                        >
                            <div className="w-[200px] h-[200px] max-w-full max-h-full relative">
                                <Image
                                    src={`${BASE_URL}/${file.hash}`}
                                    alt={file.name}
                                    draggable={false}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </div>

                            <div className="absolute left-0 top-0 w-full h-full z-20" />

                            <div className="hidden sm:group-hover:flex absolute left-0 top-0 lg:w-[600px] z-10">
                                <div className="max-w-full max-h-full w-96 h-96 2xl:w-[600px] 2xl:h-[600px] relative ">
                                    <Image
                                        src={`${BASE_URL}/${file.hash}`}
                                        alt={file.name}
                                        draggable={false}
                                        objectFit="cover"
                                        layout="fill"
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
