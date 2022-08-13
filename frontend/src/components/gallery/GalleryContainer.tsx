import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';

function GalleryContainet() {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="w-full bg-orange-500 min-h-screen pt-10">
            <Link href="/">
                <p className='text-blue-300 hover:underline focus:underline'>Upload more</p>
            </Link>

            <div className="grid grid-cols-3 mt-10">
                {appInfo.files &&
                    appInfo.files.map((file) => {
                        if (
                            !file.name.includes('.png') &&
                            !file.name.includes('.jpg') &&
                            !file.name.includes('.gif') &&
                            !file.name.includes('.jpeg') &&
                            !file.name.includes('.webp')
                        ) {
                            return null;
                        }
                        return (
                            <img
                                src={`${BASE_URL}/${file.hash}`}
                                key={file.name}
                                className="w-full h-full object-cover"
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default GalleryContainet;
