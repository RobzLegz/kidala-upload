import { HashtagIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React, { useState } from 'react';
import { getFileExtension } from '../../utils/getFileExtension';
import { AddTag } from './AddTag';
import BubbleText from '../BubbleText';
import { Input } from '../Input';
import { SwitchWrapper } from '../SwitchWrapper';
import { TagWrapper } from './TagWrapper';

export interface FileInfoProps {
    source?: string;
    file?: File;
    fileName?: string;
    tag?: string;
    tags: string[];
    isPrivate?: boolean;
    addTag?: () => void;
    setIsPrivate?: React.Dispatch<React.SetStateAction<boolean>>;
    setTag?: React.Dispatch<React.SetStateAction<string>>;
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
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
}) => {
    const [tagOpened, setTagOpened] = useState(false);

    return (
        <div className="flex bg-primary-700 w-full p-4 mt-2 rounded-lg">
            <div className="w-32 h-48 relative mr-2">
                {source ? (
                    <Image
                        src={source}
                        layout="fill"
                        objectFit="cover"
                        draggable={false}
                    />
                ) : null}
            </div>

            <div className="flex flex-col flex-1">
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

                <TagWrapper tags={tags} setTags={setTags} />

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
                        action="Make private"
                        actionDescription="Other users won't be able to view your file"
                        className="mt-2"
                    />
                )}

                {/* <div className="flex items-center bg-primary-800">
                    <HashtagIcon className="text-white h-6" />

                    <Input
                        className="bg-primary-800 w-full"
                        placeholder="Enter tag"
                    />
                </div> */}
            </div>
        </div>
    );
};

export default FileInfo;
