import { DocumentIcon, DownloadIcon, LinkIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { BASE_URL } from '../../requests/routes';
import { getFileFromHash } from '../../utils/getFileFromHash';
import Navigation from '../navigation/Navigation';
import GalleryImages from './GalleryImages';

function SingleFileContainer() {
    const router = useRouter();

    const { hash } = router.query;

    const appInfo: AppInfo = useSelector(selectApp);

    const [file, setFile] = useState<FileInterface | undefined>(undefined);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (appInfo.files && typeof hash === 'string') {
            const foundFile = getFileFromHash(hash, appInfo.files);

            setFile(foundFile);
            setCopied(false);
        }
    }, [hash, appInfo.files]);

    const download = () => {
        if (typeof hash === 'string') {
            window.open(`${BASE_URL}/${hash}`);
        }
    };

    const saveToClipboard = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
    };

    return (
        <div className="w-full min-h-screen pt-10 px-2">
            <Navigation />

            {file ? (
                <section className="w-full flex flex-col items-center justify-center mt-2 pb-2">
                    {!file.name.includes('.png') &&
                    !file.name.includes('.jpg') &&
                    !file.name.includes('.gif') &&
                    !file.name.includes('.jpeg') &&
                    !file.name.includes('.svg') &&
                    !file.name.includes('.jfif') &&
                    !file.name.includes('.webp') ? (
                        <div className="flex h-40 w-40 items-center justify-center flex-col">
                            <DocumentIcon className="text-white h-24" />

                            <p className="text-white text-center">
                                {file.name}
                            </p>

                            {file.size ? (
                                <small className="text-gray-400">
                                    {file.size / 1000000} mb
                                </small>
                            ) : null}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-col">
                            <img
                                src={`${BASE_URL}/${hash}`}
                                alt={String(hash)}
                                className="relative object-cover max-h-[600px]"
                                draggable={false}
                            />

                            <p className="text-white text-center mt-2">
                                {file.name}
                            </p>

                            {file.size ? (
                                <small className="text-gray-400">
                                    {file.size / 1000000} mb
                                </small>
                            ) : null}
                        </div>
                    )}

                    <div className="flex items-center justify-center w-full max-w-[400px]">
                        <button
                            className="flex w-full bg-emerald-600 items-center justify-center mt-4 h-8 mx-2"
                            onClick={download}
                        >
                            <DownloadIcon className="text-white h-4 mr-1" />

                            <p className="text-white">Download</p>
                        </button>

                        <button
                            className={`flex w-full bg-emerald-600 items-center justify-center mt-4 h-8 mx-2 ${
                                copied ? 'border-2 border-white' : ''
                            }`}
                            onClick={saveToClipboard}
                        >
                            <LinkIcon className="text-white h-4 mr-1" />

                            <p className="text-white">Copy link</p>
                        </button>
                    </div>
                </section>
            ) : null}

            <GalleryImages />
        </div>
    );
}

export default SingleFileContainer;
