import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import GalleryFile from './GalleryFile';
import GalleryInfoInsert from './GalleryInfoInsert';
import { detectFileType } from '../../utils/detectFileType';
import { getFileFromHash } from '../../utils/getFileFromHash';
import { FileInterface } from '../../interfaces/file';
import NoFiles from './NoFiles';
import { getFileFromHashReq } from '../../requests/fileRequests';

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
    // Base grid styling with aspect ratio container
    const cn = `mt-2 grid w-full overflow-hidden mb-4 ${
        !liked && !saved ? 'xl:grid-cols-4' : ''
    } grid-cols-3 sm:px-4 gap-0.5 sm:gap-2 lg:gap-4`;

    // Container style to enforce aspect ratio
    const containerStyle = `
        relative w-full pb-[100%] overflow-hidden
    `;

    // Content style to maintain proportions
    const contentStyle = `
        absolute inset-0 flex items-center justify-center
    `;

    const windowSize = useWindowSize();
    const router = useRouter();
    const dispatch = useDispatch();

    const { f } = router.query;
    const appInfo: AppInfo = useSelector(selectApp);
    const [infoInsert, setInfoInsert] = useState<number | null>(null);
    const [clickedFileInfo, setClickedFileInfo] = useState<FileInterface | null>(null);
    const [ittFiles, setIttFiles] = useState(appInfo.files);

    useEffect(() => {
        if (activeFiles) {
            setIttFiles(activeFiles);
        } else {
            setIttFiles(appInfo.files);
        }
    }, [activeFiles]);

    const handleFileClick = (index?: number, hash?: string) => {
        if (typeof index !== 'number') return;

        const fileRow = Number(windowSize.width) >= windowSizes.xl ? 4 : 3;
        const rowIndex = Math.floor(index / fileRow);
        const nextRowFirst = rowIndex * fileRow + fileRow;

        setInfoInsert(nextRowFirst);

        const clickedInfo = getFileFromHash(hash, ittFiles);
        if (clickedInfo) setClickedFileInfo(clickedInfo);

        const query = saved
            ? { page: 'favourites', f: hash }
            : liked
                ? { page: 'liked', f: hash }
                : { f: hash };

        const pathname = saved || liked ? '/profile' : '/gallery';

        router.push({ pathname, query }, undefined, { shallow: true });
    };

    useEffect(() => {
        if (typeof f === 'string' && infoInsert === null && ittFiles) {
            const clickedInfo = getFileFromHash(f, ittFiles);
            if (clickedInfo) {
                setClickedFileInfo(clickedInfo);
            } else {
                getFileFromHashReq(f, dispatch, setClickedFileInfo);
            }
            setInfoInsert(0);
        }
    }, [f, ittFiles]);

    if (!ittFiles?.length) {
        return liked || saved ? <NoFiles liked={liked} saved={saved} /> : null;
    }

    const filteredFiles = ittFiles.filter(file =>
        appInfo.sortOptions.showFiles ? true : detectFileType(file.name) === 'image'
    );

    if (typeof infoInsert === 'number' && typeof f === 'string') {
        const beforeInsert = filteredFiles.slice(0, infoInsert);
        const afterInsert = filteredFiles.slice(infoInsert);

        return (
            <div className={cn}>
                {beforeInsert.map((file, i) => (
                    <div key={i} className={containerStyle}>
                        <div className={contentStyle}>
                            <GalleryFile
                                props={file}
                                index={i}
                                handleFileClick={handleFileClick}
                            />
                        </div>
                    </div>
                ))}

                {clickedFileInfo && (
                    <GalleryInfoInsert
                        fileInfo={clickedFileInfo}
                        colspan={Number(windowSize.width) >= windowSizes.xl ? 4 : 3}
                    />
                )}

                {afterInsert.map((file, i) => (
                    <div key={i} className={containerStyle}>
                        <div className={contentStyle}>
                            <GalleryFile
                                props={file}
                                index={infoInsert + i}
                                handleFileClick={handleFileClick}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cn}>
            {filteredFiles.map((file, i) => (
                <div key={i} className={containerStyle}>
                    <div className={contentStyle}>
                        <GalleryFile
                            props={file}
                            index={i}
                            handleFileClick={handleFileClick}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GalleryGrid;
