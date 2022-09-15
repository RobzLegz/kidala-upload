import React from 'react';
import { Tag } from '../Tag';

export interface TagWrapperProps {
    tags: string[];
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagWrapper: React.FC<TagWrapperProps> = ({ tags, setTags }) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-[400px] overflow-x-scroll tag_wrapper flex items-center justify-start px-4 py-2">
            {tags.map((tag, i) => (
                <Tag tag={tag} tags={tags} setTags={setTags} key={i} />
            ))}
        </div>
    );
};
