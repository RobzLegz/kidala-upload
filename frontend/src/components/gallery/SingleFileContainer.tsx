import {
    DocumentIcon,
    DownloadIcon,
    LinkIcon,
    MailIcon,
    MusicNoteIcon,
    PhoneIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FileInterface } from '../../interfaces/file';
import { AppInfo, selectApp } from '../../redux/slices/appSlice';
import { LanguageInfo, selectLanguage } from '../../redux/slices/languageSlice';
import { BASE_URL } from '../../requests/routes';
import { getFileFromHash } from '../../utils/getFileFromHash';
import { AdIndicator } from '../ads/AdIndicator';
import Navigation from '../navigation/Navigation';
import dynamic from 'next/dynamic';
import { default as OptImage } from 'next/image';
import { isImage } from '../../utils/isImage';
import { detectFileType } from '../../utils/detectFileType';
import AudioPlayer from './AudioPlayer';

const GalleryImages = dynamic(() => import('./GalleryImages'));

function SingleFileContainer() {
    const router = useRouter();

    const { hash } = router.query;

    const appInfo: AppInfo = useSelector(selectApp);
    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    const [file, setFile] = useState<FileInterface | undefined>(undefined);
    const [copied, setCopied] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (appInfo.files && typeof hash === 'string') {
            setFile(undefined);
            const foundFile = getFileFromHash(hash, appInfo.files);

            setFile(foundFile);
            setCopied(false);

            if (foundFile && isImage(foundFile.name)) {
                const img = new Image();
                img.src = `${BASE_URL}/${hash}`;
                img.onload = () => {
                    const { width, height } = img;

                    let nH = 0;

                    const nW = 600;
                    const w_c_p = ((nW - width) / width) * 100;
                    const f_w_c_p = Math.floor(w_c_p) / 100;
                    const hDiff = height * f_w_c_p;

                    nH = height + hDiff;

                    setImageDimensions({
                        width: nW,
                        height: nH,
                    });
                };
            }
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

        const imgUrl = `${window.location.origin}/gallery/${hash}`;

        navigator.clipboard.writeText(imgUrl);
        setCopied(true);
    };

    return (
        <div className="w-full min-h-screen pt-10 px-2">
            <Navigation />

            {file ? (
                <section className="w-full flex flex-col items-center justify-center mt-2 pb-2">
                    {detectFileType(file.name) === 'image' ? (
                        <div className="flex items-center justify-center flex-col relative">
                            {file.is_ad ? <AdIndicator /> : null}

                            {file ? (
                                <OptImage
                                    src={`${BASE_URL}/${file.hash}`}
                                    alt={String(file.hash)}
                                    draggable={false}
                                    width={imageDimensions.width}
                                    height={imageDimensions.height}
                                    quality={95}
                                    blurDataURL={`${BASE_URL}/${file.hash}`}
                                    placeholder="blur"
                                    objectFit="cover"
                                    priority
                                />
                            ) : null}

                            {!file.is_ad ? (
                                <p className="text-white text-center mt-2">
                                    {file.name}
                                </p>
                            ) : null}
                        </div>
                    ) : detectFileType(file.name) === 'audio' ? (
                        <AudioPlayer file={file}/>
                    ) : (
                        <div className="flex h-40 w-40 items-center justify-center flex-col">
                            <DocumentIcon className="text-white h-24" />

                            <p className="text-white text-center">
                                {file.name}
                            </p>
                        </div>
                    )}

                    {!file.is_ad && file.size ? (
                        <small className="text-gray-400">
                            {file.size / 1000000} mb
                        </small>
                    ) : null}

                    {file.is_ad ? (
                        <div className="flex flex-col items-center justify-center">
                            <strong className="text-white mt-2 mb-1 text-lg text-center">
                                {languageInfo.text.gallery.contact}
                            </strong>

                            <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[800px]">
                                {file.email ? (
                                    <a
                                        className="w-[400px] max-w-full items-center flex justify-center my-2 sm:mx-2 "
                                        href={`mailto:${file.email}`}
                                    >
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <MailIcon className="h-6 text-gray-100" />

                                            <p className="text-gray-100">
                                                {file.email}
                                            </p>
                                        </div>
                                    </a>
                                ) : null}

                                {file.phoneNumber ? (
                                    <a
                                        className="w-[400px] max-w-full items-center flex justify-center my-2 sm:mx-2"
                                        href={`tel:${file.phoneNumber}`}
                                    >
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <PhoneIcon className="h-6 text-gray-100" />

                                            <p className="text-gray-100">
                                                {file.phoneNumber}
                                            </p>
                                        </div>
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    ) : null}

                    <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:max-w-[400px]">
                        <button
                            className="flex w-full bg-emerald-600 items-center justify-center mt-4 h-8 sm:mx-2"
                            onClick={download}
                        >
                            <DownloadIcon className="text-white h-4 mr-1" />

                            <p className="text-white">
                                {languageInfo.text.gallery.download}
                            </p>
                        </button>

                        <button
                            className={`flex w-full bg-emerald-600 items-center justify-center mt-4 h-8 sm:mx-2 ${
                                copied ? 'border-2 border-white' : ''
                            }`}
                            onClick={saveToClipboard}
                        >
                            <LinkIcon className="text-white h-4 mr-1" />

                            <p className="text-white">
                                {languageInfo.text.gallery.copyLink}
                            </p>
                        </button>
                    </div>
                </section>
            ) : null}

            <GalleryImages />
        </div>
    );
}

export default SingleFileContainer;
