import React from 'react';
import { Tag as TagInterface } from '../../interfaces/tag';
import { Tag } from '../Tag';

export interface TagWrapperProps {
    tags?: string[];
    className?: string;
    formTags?: TagInterface[];
    formWidth?: number;
    setTags?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagWrapper: React.FC<TagWrapperProps> = ({
    tags,
    setTags,
    formWidth,
    formTags,
    className,
}) => {
    if ((!tags || tags.length === 0) && (!formTags || formTags.length === 0)) {
        return null;
    }

    if (formTags) {
        return (
            <div
                className={`overflow-x-auto overflow-y-hidden tag_wrapper ${
                    className ? className : ''
                }`}
            >
                <div
                    className={`flex items-center justify-start py-2 min-w-full max-w-[900px] sm:max-w-[430px]`}
                >
                    {formTags.map((tag, i) => (
                        <div className="" key={i}>
                            <Tag tag={tag.tag} close={false} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (tags) {
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
    }

    return null;
};
