import React, { useEffect, useRef, useState } from 'react';
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

export interface GalleryGridProps {
    activeFiles?: FileInterface[] | null;
    liked?: boolean;
    saved?: boolean;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({
    activeFiles = null,
    liked = false,
    saved = false,
}) => {
    const windowSize = useWindowSize();
    const router = useRouter();

    const appInfo: AppInfo = useSelector(selectApp);

    const [infoInsert, setInfoInsert] = useState<number | null>(null);
    const [clickedFileInfo, setClickedFileInfo] =
        useState<FileInterface | null>(null);
    const [ittFiles, setIttFiles] = useState(appInfo.files);

    useEffect(() => {
        if (activeFiles) {
            setIttFiles(activeFiles);
        } else {
            setIttFiles(appInfo.files);
        }
    }, [activeFiles]);

    const handleFileClick = (index?: number, hash?: string) => {
        if (typeof index !== 'number') {
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

        router.push(
            {
                pathname: '/new/gallery',
                query: { f: hash },
            },
            undefined,
            { shallow: true }
        );
    };

    if (typeof infoInsert === 'number' && ittFiles) {
        return (
            <div className={cn}>
                {ittFiles
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
                        fileInfo={clickedFileInfo}
                        colspan={
                            Number(windowSize.width) >= windowSizes.xl ? 4 : 3
                        }
                    />
                )}

                {ittFiles
                    .filter((file) =>
                        appInfo.sortOptions.showFiles
                            ? true
                            : detectFileType(file.name) === 'image'
                    )
                    .slice(infoInsert, ittFiles.length)
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
            {ittFiles &&
                ittFiles.map((file, i) => (
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
