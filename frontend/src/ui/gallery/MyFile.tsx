import {
    ChevronDownIcon,
    HeartIcon,
    LockClosedIcon,
} from '@heroicons/react/20/solid';
import { ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { windowSizes } from '../../constants/windowSizes';
import useWindowSize from '../../hooks/useWindowSize';
import { FileInterface } from '../../interfaces/file';
import { BASE_URL } from '../../requests/routes';
import { detectFileType } from '../../utils/detectFileType';
import { formatFileSize } from '../../utils/formatFileSize';
import { generateFileUrl } from '../../utils/generateFileUrl';
import { getFileLikes } from '../../utils/getFileLikes';
import GetIconFromFileType from '../GetIconFromFileType';
import { TagWrapper } from '../uploadForm/TagWrapper';
import GalleryNonImage from './GalleryNonImage';

export interface MyFileProps {
    file: FileInterface;
}

const MyFile: React.FC<MyFileProps> = ({ file }) => {
    const windowSize = useWindowSize();

    const [opened, setOpened] = useState(false);

    const download = (e: React.MouseEvent) => {
        e.preventDefault();

        if (typeof file.hash === 'string') {
            window.open(`${BASE_URL}/${file.hash}`);
        }
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(
            `https://kidala.life/gallery?f=${file.hash}`
        );
    };

    if (windowSize.width && windowSize.width <= windowSizes.sm) {
        return (
            <div
                className={`w-full bg-primary-800 border border-primary-700 p-2 rounded-lg flex flex-col sm:hidden items-start justify-start transition-all duration-300 mb-2 ${
                    opened ? 'h-auto' : 'h-20'
                }`}
            >
                <div className="flex w-full h-16 items-center justify-start">
                    <div className="w-16 h-16 relative mr-2">
                        {detectFileType(file.name) === 'image' ? (
                            <Image
                                src={generateFileUrl(file.hash, file.name)}
                                draggable={false}
                                objectFit="cover"
                                layout="fill"
                                alt="Kidala"
                            />
                        ) : (
                            <GalleryNonImage filename={file.name} />
                        )}
                    </div>

                    <div
                        className={`flex flex-col flex-1 overflow-hidden relative items-start h-full justify-start ${
                            opened ? '' : 'sm:max-h-full'
                        }`}
                    >
                        <small className="text-white">{file.name}</small>

                        <div className="w-28 flex items-center justify-between h-20">
                            {/* <div className="flex flex-col items-center justify-center">
                                <HeartIcon className="h-5 text-notification" />

                                <small className="text-primary-100">
                                    {getFileLikes(file)}
                                </small>
                            </div> */}

                            <button className="flex flex-col items-center justify-center">
                                <ArrowDownTrayIcon className="h-5 text-notification mb-1" />

                                <small className="text-primary-300">
                                    {formatFileSize(file.size)}mb
                                </small>
                            </button>

                            <div className="flex flex-col items-center justify-center">
                                <button>
                                    <LinkIcon className="h-5 text-notification" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {(file.description || file.tag.length > 0) && (
                        <button onClick={() => setOpened(!opened)}>
                            <ChevronDownIcon
                                className={`text-primary-100 h-8 transition-all duration-300 ${
                                    opened ? '-rotate-180' : 'rotate-0'
                                }`}
                            />
                        </button>
                    )}
                </div>

                {opened && (
                    <div className="flex flex-col items-start justify-start w-full p-1 overflow-hidden">
                        <p className="text-primary-100">{file.description}</p>

                        <div className="w-full">
                            <TagWrapper formTags={file.tag} />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`w-full bg-primary-800 border border-primary-700 p-2 rounded-lg hidden sm:flex items-start justify-start transition-all duration-300 mb-2 ${
                opened ? 'h-auto' : 'h-24'
            }`}
        >
            <div className="w-20 h-20 relative mr-2 flex items-center justify-center">
                {detectFileType(file.name) === 'image' ? (
                    <Image
                        src={generateFileUrl(file.hash, file.name)}
                        draggable={false}
                        objectFit="cover"
                        layout="fill"
                        alt="Kidala"
                    />
                ) : (
                    <GetIconFromFileType
                        extension={detectFileType(file.name)}
                        className="w-12"
                    />
                )}
            </div>

            <div
                className={`flex flex-col flex-1 overflow-hidden relative items-start h-full justify-start ${
                    opened ? '' : 'sm:max-h-full'
                }`}
            >
                <strong className="text-white">{file.name}</strong>

                <p className="text-primary-100">{file.description}</p>

                <TagWrapper formTags={file.tag} />

                {!opened && file.description && (
                    <div className="from-transparent to-primary-900 bg-gradient-to-b h-full w-full absolute top-8 left-0 rounded-lg" />
                )}
            </div>

            <div
                className={`flex items-center justify-between h-20 gap-2 ${
                    file.description ? 'w-32' : 'w-20'
                }`}
            >
                {file.description && (
                    <button onClick={() => setOpened(!opened)}>
                        <ChevronDownIcon
                            className={`text-primary-100 h-8 transition-all duration-300 ${
                                opened ? '-rotate-180' : 'rotate-0'
                            }`}
                        />
                    </button>
                )}

                <div className="w-8 flex flex-col items-center justify-center">
                    {file.private && (
                        <LockClosedIcon className="h-6 text-notification" />
                    )}
                </div>

                {/* <div className="flex flex-col items-center justify-center w-8">
                    <HeartIcon className="h-6 text-notification" />

                    <p className="text-primary-100">{getFileLikes(file)}</p>
                </div> */}

                <div className="flex flex-col items-center justify-center">
                    <button onClick={copyUrl}>
                        <LinkIcon className="h-5 text-notification" />
                    </button>
                </div>

                <button
                    className="flex flex-col items-center justify-center"
                    onClick={download}
                >
                    <ArrowDownTrayIcon className="h-6 text-notification mb-1" />

                    <small className="text-primary-300">
                        {formatFileSize(file.size)}mb
                    </small>
                </button>
            </div>
        </div>
    );
};

export default MyFile;
