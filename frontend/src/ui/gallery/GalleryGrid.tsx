import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import GalleryFile from './GalleryFile';
import { useRouter } from 'next/router';
import GalleryInfoInsert from './GalleryInfoInsert';
import { detectFileType } from '../../utils/detectFileType';
import { getFileFromHash } from '../../utils/getFileFromHash';
import { FileInterface } from '../../interfaces/file';

const cn =
    'mt-2 grid grid-cols-3 place-content-center w-full overflow-hidden xl:grid-cols-4 px-0.5 gap-0.5 sm:gap-2 mb-4';

const GalleryGrid = () => {
    const windowSize = useWindowSize();
    const router = useRouter();

    const appInfo: AppInfo = useSelector(selectApp);

    const infoRef = useRef<any>();

    const [infoInsert, setInfoInsert] = useState<number | null>(null);
    const [clickedFileInfo, setClickedFileInfo] =
        useState<FileInterface | null>(null);

    const handleFileClick = (index?: number, hash?: string) => {
        if (!index) {
            return;
        }

        const fileRow = Number(windowSize.width) >= windowSizes.xl ? 4 : 3;
        const rowIndexStr = `${index / fileRow}`;
        const rowIndexDivided = rowIndexStr.split('.')[0];
        const rowIndex = Number(rowIndexDivided);
        const nextRowFirst = rowIndex * fileRow + fileRow;

        setInfoInsert(nextRowFirst);

        const clickedInfo = getFileFromHash(hash, appInfo.files);

        if (clickedInfo) {
            setClickedFileInfo(clickedInfo);
        }

        infoRef.current &&
            infoRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                // inline: 'start',
            });

        router.push(
            {
                pathname: '/new/gallery',
                query: { f: hash },
            },
            undefined,
            { shallow: true }
        );
    };

    if (infoInsert && appInfo.files) {
        return (
            <div className={cn}>
                {appInfo.files
                    .filter((file) =>
                        appInfo.sortOptions.showFiles
                            ? true
                            : detectFileType(file.name) === 'image'
                    )
                    .slice(0, infoInsert)
                    .map((file, i) => (
                        <GalleryFile
                            props={file}
                            index={i}
                            handleFileClick={handleFileClick}
                            key={i}
                        />
                    ))}

                {clickedFileInfo && (
                    <GalleryInfoInsert
                        ref={infoRef}
                        fileInfo={clickedFileInfo}
                        colspan={
                            Number(windowSize.width) >= windowSizes.xl ? 4 : 3
                        }
                    />
                )}

                {appInfo.files
                    .filter((file) =>
                        appInfo.sortOptions.showFiles
                            ? true
                            : detectFileType(file.name) === 'image'
                    )
                    .slice(infoInsert, appInfo.files.length)
                    .map((file, i) => (
                        <GalleryFile
                            props={file}
                            index={infoInsert + i}
                            handleFileClick={handleFileClick}
                            key={i}
                        />
                    ))}
            </div>
        );
    }

    return (
        <div className={cn}>
            {appInfo.files &&
                appInfo.files.map((file, i) => (
                    <GalleryFile
                        props={file}
                        index={i}
                        handleFileClick={handleFileClick}
                        key={i}
                    />
                ))}
        </div>
    );
};

export default GalleryGrid;
