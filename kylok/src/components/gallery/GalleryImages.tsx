import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppInfo,
    selectApp,
    setSortOptions,
} from '../../redux/slices/appSlice';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';
import { selectUser, UserInfo } from '../../redux/slices/userSlice';
import { getAllFiles } from '../../requests/fileRequests';
import useWindowSize from '../../hooks/useWindowSize';
import dynamic from 'next/dynamic';

const GalleryImage = dynamic(() => import('./GalleryImage'));

const gridStyle = 'mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 2xl:grid-cols-5 gap-2'

function GalleryImages() {
    const dispatch = useDispatch();
    const router = useRouter();
    const windowSize = useWindowSize();

    const appInfo: AppInfo = useSelector(selectApp);
    const userInfo: UserInfo = useSelector(selectUser);
    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    useEffect(() => {
        if (!appInfo.files) {
            getAllFiles(dispatch);
        }
    }, []);

    if (
        router.pathname === '/my-files' ||
        router.pathname === '/my-files/[hash]'
    ) {
        return (
            <div className={gridStyle}>
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
                                key={i}
                                file={file}
                                index={i}
                                isSeen={false}
                                windowSize={windowSize}
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
                        {languageInfo.text.gallery.showNonImageFiles}
                    </label>
                </div>
            </div>

            <div className={gridStyle}>
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
                                key={i}
                                file={file}
                                index={i}
                                isSeen={false}
                                windowSize={windowSize}
                            />
                        );
                    })}
            </div>

            {appInfo.previewIdx &&
            !appInfo.sortOptions.myFiles &&
            appInfo.files &&
            appInfo.files.length !== appInfo.previewIdx + 1 ? (
                <div className="flex w-full items-center justify-start py-2 border-b-2 border-dashed border-white">
                    <strong className="text-white">
                        {languageInfo.text.gallery.seen}:
                    </strong>
                </div>
            ) : null}

            {!appInfo.sortOptions.myFiles ? (
                <div className={gridStyle}>
                    {appInfo.files &&
                        appInfo.previewIdx &&
                        appInfo.files.map((file, i) => {
                            if (appInfo.previewIdx && i > appInfo.previewIdx) {
                                return null;
                            }

                            return (
                                <GalleryImage
                                    key={i}
                                    file={file}
                                    index={i}
                                    isSeen={true}
                                    windowSize={windowSize}
                                />
                            );
                        })}
                </div>
            ) : null}
        </div>
    );
}

export default GalleryImages;
