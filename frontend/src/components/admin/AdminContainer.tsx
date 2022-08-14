import { TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { deleteFile, getAllFiles } from '../../requests/adminRequests';
import { BASE_URL } from '../../requests/routes';

function AdminContainer() {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="page flex items-start justify-start">
            <div className="w-full max-w-[700px] flex items-start justify-start flex-col">
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
                                className="flex items-start justify-start w-full mb-2"
                                key={file.name}
                            >
                                <Image
                                    src={`${BASE_URL}/${file.hash}`}
                                    alt={file.name}
                                    draggable={false}
                                    objectFit="cover"
                                    width={40}
                                    height={40}
                                />

                                <div className="flex-1 flex items-start justify-start h-full ml-2">
                                    <div className="flex flex-col justify-between items-start h-full w-full max-w-[300px]">
                                        <p className="text-white">
                                            {file.name}
                                        </p>

                                        <small className="text-gray-300">
                                            {file.hash}
                                        </small>
                                    </div>

                                    <button
                                        className="bg-red-500 h-8 w-8 flex items-center justify-center"
                                        onClick={() =>
                                            deleteFile(file._id.$oid, dispatch)
                                        }
                                    >
                                        <TrashIcon className="text-white h-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default AdminContainer;
