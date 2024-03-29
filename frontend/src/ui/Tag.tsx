import { XCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

export interface TagProps {
    tag: string;
    close?: boolean;
    tags?: string[];
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Tag: React.FC<TagProps> = ({
    tag,
    setTags,
    tags,
    close = true,
}) => {
    const removeTag = (e: React.MouseEvent) => {
        e.preventDefault();

        if (setTags && tags) {
            const newTags = tags.filter((t) => t !== tag);

            setTags(newTags);
        }
    };

    return (
        <div className="flex items-center justify-center mr-2 bg-accent px-1 rounded-full max-h-6 overflow-hidden">
            <p className="text-white mr-1 truncate">#{tag}</p>

            {close && (
                <button
                    className="items-center justify-center flex"
                    onClick={removeTag}
                >
                    <XCircleIcon className="text-white h-5 transition-colors duration-300 hover:text-primary-800" />
                </button>
            )}
        </div>
    );
};
