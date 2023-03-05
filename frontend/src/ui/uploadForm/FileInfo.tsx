import Image from 'next/image';
import React, { useState } from 'react';
import { getFileExtension } from '../../utils/getFileExtension';
import { AddTag } from './AddTag';
import BubbleText from '../BubbleText';
import { Input } from '../Input';
import { SwitchWrapper } from '../SwitchWrapper';
import { TagWrapper } from './TagWrapper';
import Button from '../Button';
import GetIconFromFileType from '../GetIconFromFileType';
import { detectFileType } from '../../utils/detectFileType';
import {
    NotificationInfo,
    selectNotification,
} from '../../redux/slices/notificationSlice';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import { windowSizes } from '../../constants/windowSizes';

export interface FileInfoProps {
    source?: string;
    fileName?: string;
    tag?: string;
    description?: string;
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
    setDescription?: React.Dispatch<React.SetStateAction<string>>;
}

const FileInfo: React.FC<FileInfoProps> = ({
    source,
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
    description = '',
    setDescription,
}) => {
    const windowSize = useWindowSize();

    const notificationInfo: NotificationInfo = useSelector(selectNotification);

    const [tagOpened, setTagOpened] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            selectFile && selectFile(e.target.files);
        }
    };

    return (
        <div className="flex bg-primary-800 w-full p-2 sm:p-4 mt-2 rounded-lg border border-primary-700">
            <input
                type="file"
                name="drop_box_reselect_file"
                id="drop_box_reselect_file"
                className="hidden"
                onChange={handleFileSelect}
            />

            {detectFileType(fileName) === 'image' ? (
                <div className="w-32 relative mr-2 h-40 overflow-hidden hidden sm:block">
                    <GetIconFromFileType
                        extension={detectFileType(fileName)}
                        source={source}
                        imageDimensions={imageDimensions}
                    />
                </div>
            ) : null}

            <div
                className={`flex flex-col flex-1 ${
                    detectFileType(fileName) === 'image'
                        ? `max-w-full sm:max-w-[430px]`
                        : 'max-w-full'
                }`}
            >
                {fileName && (
                    <div className="flex w-full justify-start">
                        <div className="w-14 mr-2 block sm:hidden">
                            <div className="w-14 relative mr-2 h-14 overflow-hidden">
                                <GetIconFromFileType
                                    extension={detectFileType(fileName)}
                                    source={source}
                                    imageDimensions={imageDimensions}
                                />
                            </div>
                        </div>

                        <div className="flex items-center flex-col justify-start flex-1 sm:w-full overflow-hidden">
                            <div className="flex items-center justify-start w-full">
                                {detectFileType(fileName) !== 'image' ? (
                                    <GetIconFromFileType
                                        extension={detectFileType(fileName)}
                                        source={source}
                                        className="w-6 mr-1 hidden sm:flex"
                                    />
                                ) : null}

                                <strong className="text-white text-left truncate text-sm sm:text-base flex-1">
                                    {fileName}
                                </strong>

                                <div className="ml-2">
                                    <BubbleText filled>
                                        <span className="text-white text-sm font-normal">
                                            {getFileExtension(fileName)}
                                        </span>
                                    </BubbleText>
                                </div>
                            </div>

                            {/* <div className="flex w-full items-start mt-2">
                                <AddTag
                                    tag={tag}
                                    setTag={setTag}
                                    opened={
                                        windowSize.width &&
                                        windowSize.width > windowSizes.sm
                                            ? tagOpened
                                            : true
                                    }
                                    setOpened={setTagOpened}
                                    addTag={addTag}
                                />
                            </div> */}
                        </div>
                    </div>
                )}

                <TagWrapper
                    tags={tags}
                    setTags={setTags}
                    formWidth={formWidth}
                />

                <Input
                    className="bg-primary-700 w-full mt-2"
                    placeholder="Enter description"
                    textarea
                    rows={4}
                    value={description}
                    maxLength={250}
                    onChange={(e) =>
                        setDescription && setDescription(e.target.value)
                    }
                />

                {typeof isPrivate === 'boolean' && (
                    <SwitchWrapper
                        checked={isPrivate}
                        setChecked={setIsPrivate}
                        action="File private"
                        actionDescription="Other users won't be able to see your file"
                        className="mt-2"
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

                    <Button
                        size="small"
                        onClick={handleUpload}
                        type="submit"
                        autoFocus
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FileInfo;
