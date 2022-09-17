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

    return (
        <div className="overflow-x-auto tag_wrapper">
            <div
                className={`flex items-center justify-start py-2 min-w-full max-w-[900px] sm:max-w-[430px]`}
            >
                {tags.map((tag, i) => (
                    <div className="" key={i}>
                        <Tag tag={tag} tags={tags} setTags={setTags} />
                    </div>
                ))}
            </div>
        </div>
    );
};
