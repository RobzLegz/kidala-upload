import Image from 'next/image';
import React, { useState } from 'react';
import { getFileExtension } from '../../utils/getFileExtension';
import { AddTag } from './AddTag';
import BubbleText from '../BubbleText';
import { Input } from '../Input';
import { SwitchWrapper } from '../SwitchWrapper';
import { TagWrapper } from './TagWrapper';
import Button from '../Button';
import { EyeIcon, LockClosedIcon } from '@heroicons/react/solid';

export interface FileInfoProps {
    source?: string;
    file?: File;
    fileName?: string;
    tag?: string;
    tags: string[];
    isPrivate?: boolean;
    addTag?: () => void;
    formWidth?: number;
    selectFile?: (files: FileList) => void;
    setIsPrivate?: React.Dispatch<React.SetStateAction<boolean>>;
    setTag?: React.Dispatch<React.SetStateAction<string>>;
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
    handleUpload?: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<void>;
    imageDimensions?: {
        width: number;
        height: number;
    };
}

const FileInfo: React.FC<FileInfoProps> = ({
    source,
    file,
    fileName,
    tag,
    setTag,
    isPrivate,
    setIsPrivate,
    tags,
    setTags,
    addTag,
    formWidth,
    selectFile,
    handleUpload,
    imageDimensions,
}) => {
    const [tagOpened, setTagOpened] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            selectFile && selectFile(e.target.files);
        }
    };

    return (
        <div className="flex bg-primary-700 w-full p-4 mt-2 rounded-lg">
            <input
                type="file"
                name="drop_box_reselect_file"
                id="drop_box_reselect_file"
                className="hidden"
                onChange={handleFileSelect}
            />

            <div className="w-32 relative mr-2 h-40 overflow-hidden">
                {source ? (
                    <Image
                        src={source}
                        objectFit="cover"
                        draggable={false}
                        width={
                            imageDimensions
                                ? imageDimensions.width
                                    ? imageDimensions.width
                                    : 128
                                : 128
                        }
                        height={
                            imageDimensions
                                ? imageDimensions.height
                                    ? imageDimensions.height
                                    : 164
                                : 164
                        }
                    />
                ) : null}
            </div>

            <div
                className={`flex flex-col flex-1 ${
                    formWidth ? `max-w-[430px]` : ''
                }`}
            >
                {fileName && (
                    <div className="flex items-center">
                        <strong className="text-white mr-4">{fileName}</strong>

                        <BubbleText live>
                            <span className="text-white text-sm font-normal">
                                {getFileExtension(fileName)}
                            </span>
                        </BubbleText>

                        <AddTag
                            tag={tag}
                            setTag={setTag}
                            opened={tagOpened}
                            setOpened={setTagOpened}
                            className="ml-2"
                            addTag={addTag}
                        />
                    </div>
                )}

                <TagWrapper
                    tags={tags}
                    setTags={setTags}
                    formWidth={formWidth}
                />

                <Input
                    className="bg-primary-800 w-full mt-2"
                    placeholder="Enter description"
                    textarea
                    rows={4}
                />

                {typeof isPrivate === 'boolean' && (
                    <SwitchWrapper
                        checked={isPrivate}
                        setChecked={setIsPrivate}
                        action="File private"
                        actionDescription="Other users won't be able to see your file"
                        className="mt-2"
                        icon={
                            isPrivate ? (
                                <LockClosedIcon className="text-primary-300 h-4" />
                            ) : (
                                <EyeIcon className="text-white h-4" />
                            )
                        }
                    />
                )}

                <div className="flex w-full items-center justify-end mt-2">
                    <Button
                        size="small"
                        color="secondary-800"
                        className="mr-2"
                        isLabel
                        htmlFor="drop_box_reselect_file"
                    >
                        Change file
                    </Button>

                    <Button size="small" onClick={handleUpload} type="submit">
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileInfo;
