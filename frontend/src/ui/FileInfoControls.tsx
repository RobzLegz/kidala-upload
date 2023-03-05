import { ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { FileInterface } from '../interfaces/file';
import { BASE_URL } from '../requests/routes';
import Button from './Button';

export interface FileInfoControlsProps {
    file: FileInterface;
}

const FileInfoControls: React.FC<FileInfoControlsProps> = ({ file }) => {
    const copyUrl = (e: React.MouseEvent) => {
        e.preventDefault();

        navigator.clipboard.writeText(
            `http://localhost:3000/gallery?f=${file.hash}`
        );
    };

    const download = (e: React.MouseEvent) => {
        e.preventDefault();

        if (typeof file.hash === 'string') {
            window.open(`${BASE_URL}/${file.hash}`);
        }
    };

    return (
        <div className="w-full p-2 flex-col items-start justify-start bg-primary-900 rounded-lg border border-primary-700">
            <p className="text-white text-xs">
                <span className="text-sm">{file.name}</span>
                {file.description ? ` - ${file.description}` : ''}
            </p>

            <div className="w-full justify-start flex items-center">
                <div className="w-56 flex items-center justify-center mt-2">
                    <Button
                        className="flex-1 mr-1"
                        size="small"
                        icon={<ArrowDownTrayIcon className="text-white h-5" />}
                        onClick={download}
                    >
                        Download
                    </Button>

                    <Button
                        className="flex-1 ml-1"
                        size="small"
                        icon={<LinkIcon className="text-white h-5" />}
                        onClick={copyUrl}
                    >
                        Copy url
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileInfoControls;
