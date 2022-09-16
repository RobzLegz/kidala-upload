import React from 'react';
import { Tag } from '../Tag';

export interface TagWrapperProps {
    tags: string[];
    formWidth?: number;
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagWrapper: React.FC<TagWrapperProps> = ({
    tags,
    setTags,
    formWidth,
}) => {
    if (!tags || tags.length === 0) {
        return null;
    }

    const maxW = formWidth ? `max-w-[${formWidth - 170}px]` : 'max-w-[400px]';

    console.log(maxW);

    return (
        <div
            className={`w-full overflow-x-scroll tag_wrapper flex items-center justify-start px-4 py-2 ${maxW}`}
        >
            {tags.map((tag, i) => (
                <Tag tag={tag} tags={tags} setTags={setTags} key={i} />
            ))}
        </div>
    );
};
