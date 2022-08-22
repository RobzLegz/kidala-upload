import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppInfo,
    selectApp,
    setSortOptions,
} from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getAllFiles } from '../../requests/adminRequests';
import GalleryImage from './GalleryImage';

function GalleryImages() {
    const dispatch = useDispatch();
    const router = useRouter();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    if (router.pathname === '/my-files' || router.pathname === '/my-files/[hash]') {
        return (
            <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                {appInfo.files &&
                    appInfo.files.map((file, i) => {
                        if (
                            !file.author ||
                            !userInfo.info ||
                            file.author !== userInfo.info._id
                        ) {
                            return null;
                        }

                        return (
                            <GalleryImage
                                file={file}
                                index={i}
                                isSeen={false}
                                key={i}
                            />
                        );
                    })}
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex w-full py-2 flex-col sm:flex-row sm:px-2 sm:items-center justify-start">
                <div className="flex items-center justify-start">
                    <input
                        type="checkbox"
                        name="non_image_files"
                        id="non_image_files"
                        className="h-4 w-4"
                        checked={appInfo.sortOptions.showFiles}
                        onChange={() =>
                            dispatch(
                                setSortOptions({
                                    ...appInfo.sortOptions,
                                    showFiles: !appInfo.sortOptions.showFiles,
                                })
                            )
                        }
                    />

                    <label
                        htmlFor="non_image_files"
                        className="text-white ml-1"
                    >
                        Show non image files
                    </label>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                {appInfo.files &&
                    appInfo.files.map((file, i) => {
                        if (
                            appInfo.previewIdx &&
                            i <= appInfo.previewIdx &&
                            !appInfo.sortOptions.myFiles
                        ) {
                            return null;
                        }

                        return (
                            <GalleryImage
                                file={file}
                                index={i}
                                isSeen={false}
                                key={i}
                            />
                        );
                    })}
            </div>

            {appInfo.previewIdx &&
            !appInfo.sortOptions.myFiles &&
            appInfo.files &&
            appInfo.files.length !== appInfo.previewIdx + 1 ? (
                <div className="flex w-full items-center justify-start py-2 border-b-2 border-dashed border-white">
                    <strong className="text-white">Seen:</strong>
                </div>
            ) : null}

            {!appInfo.sortOptions.myFiles ? (
                <div className="mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-2">
                    {appInfo.files &&
                        appInfo.previewIdx &&
                        appInfo.files.map((file, i) => {
                            if (appInfo.previewIdx && i > appInfo.previewIdx) {
                                return null;
                            }

                            return (
                                <GalleryImage
                                    file={file}
                                    index={i}
                                    isSeen={true}
                                    key={i}
                                />
                            );
                        })}
                </div>
            ) : null}
        </div>
    );
}

export default GalleryImages;
