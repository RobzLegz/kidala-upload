import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getAllFiles } from '../../requests/adminRequests';
import GalleryImage from './GalleryImage';

export interface SortOptions {
    myFiles: boolean;
    showFiles: boolean;
    new: boolean;
}

function GalleryImages() {
    const dispatch = useDispatch();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);

    const [sortOptions, setSortOptions] = useState<SortOptions>({
        myFiles: false,
        showFiles: false,
        new: false,
    });

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    return (
        <div className="">
            <div className="flex w-full py-2 flex-col sm:flex-row sm:px-2 sm:items-center justify-start">
                {userInfo.info ? (
                    <div className="flex items-center justify-start">
                        <input
                            type="checkbox"
                            name="my_files"
                            id="my_files"
                            className="h-4 w-4 border-2"
                            checked={sortOptions.myFiles}
                            onChange={() =>
                                setSortOptions({
                                    ...sortOptions,
                                    myFiles: !sortOptions.myFiles,
                                })
                            }
                        />

                        <label htmlFor="my_files" className="text-white ml-1">
                            My files
                        </label>
                    </div>
                ) : null}

                <div className="flex items-center justify-start sm:ml-4">
                    <input
                        type="checkbox"
                        name="non_image_files"
                        id="non_image_files"
                        className="h-4 w-4 border-2"
                        checked={sortOptions.showFiles}
                        onChange={() =>
                            setSortOptions({
                                ...sortOptions,
                                showFiles: !sortOptions.showFiles,
                            })
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
                        if (appInfo.previewIdx && i <= appInfo.previewIdx && !sortOptions.myFiles) {
                            return null;
                        }

                        return (
                            <GalleryImage
                                file={file}
                                index={i}
                                isSeen={false}
                                sortOptions={sortOptions}
                                key={i}
                            />
                        );
                    })}
            </div>

            {appInfo.previewIdx &&
            !sortOptions.myFiles &&
            appInfo.files &&
            appInfo.files.length !== appInfo.previewIdx + 1 ? (
                <div className="flex w-full items-center justify-start py-2 border-b-2 border-dashed border-white">
                    <strong className="text-white">Seen:</strong>
                </div>
            ) : null}

            {!sortOptions.myFiles ? (
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
                                    sortOptions={sortOptions}
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
