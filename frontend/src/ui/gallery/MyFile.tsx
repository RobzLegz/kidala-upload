import { ChevronDownIcon, HeartIcon } from '@heroicons/react/20/solid';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React, { useState } from 'react';
import { FileInterface } from '../../interfaces/file';
import { detectFileType } from '../../utils/detectFileType';
import { generateFileUrl } from '../../utils/generateFileUrl';
import { TagWrapper } from '../uploadForm/TagWrapper';
import GalleryNonImage from './GalleryNonImage';

export interface MyFileProps {
    file: FileInterface;
}

const MyFile: React.FC<MyFileProps> = ({ file }) => {
    const [opened, setOpened] = useState(false);

    return (
        <div
            className={`w-full bg-primary-800 border border-primary-700 p-2 rounded-lg flex items-start justify-start transition-all duration-300 ${
                opened ? 'h-auto' : 'h-24'
            }`}
        >
            <div className="w-20 h-20 relative mr-2">
                {detectFileType(file.name) === 'image' ? (
                    <Image
                        src={generateFileUrl(file.hash, file.name)}
                        draggable={false}
                        objectFit="cover"
                        layout='fill'
                    />
                ) : (
                    <GalleryNonImage filename={file.name} />
                )}
            </div>

            <div
                className={`flex flex-col flex-1 overflow-hidden relative ${
                    opened ? '' : 'max-h-full'
                }`}
            >
                {!opened && (
                    <div className="from-transparent to-primary-900 bg-gradient-to-b h-full w-full absolute top-8 left-0 rounded-lg" />
                )}

                <strong className="text-white">{file.name}</strong>

                <p className="text-primary-100">{file.description}</p>

                <TagWrapper formTags={file.tag} />
            </div>

            <div className="w-32 flex items-center justify-center h-full pt-5">
                <div className="flex flex-col items-center justify-center">
                    <HeartIcon className="h-6 text-notification" />

                    <p className="text-primary-100">16</p>
                </div>

                <button className="ml-4">
                    <ArrowDownTrayIcon className="h-6 text-notification" />
                </button>

                <button className="ml-4" onClick={() => setOpened(!opened)}>
                    <ChevronDownIcon
                        className={`text-primary-100 h-8 transition-all duration-300 ${
                            opened ? '-rotate-180' : 'rotate-0'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default MyFile;
