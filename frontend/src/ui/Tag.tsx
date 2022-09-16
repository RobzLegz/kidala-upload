import { XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

export interface TagProps {
    tag: string;
    tags: string[];
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Tag: React.FC<TagProps> = ({ tag, setTags, tags }) => {
    const removeTag = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (setTags) {
            const newTags = tags.filter((t) => t !== tag);

            setTags(newTags);
        }
    };

    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className="relative flex items-center justify-center mr-2 bg-accent px-1 rounded-full">
            <p className="text-white mr-1">#{tag}</p>

            <button
                className="items-center justify-center flex"
                onClick={removeTag}
            >
                <XCircleIcon className="text-white h-5 transition-colors duration-300 hover:text-primary-800" />
            </button>
        </div>
    );
};
