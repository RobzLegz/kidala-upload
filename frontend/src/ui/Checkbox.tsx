import { CheckIcon } from '@heroicons/react/24/outline';
import React from 'react';

const sizes = {
    '2': 'h-2 w-2',
    '4': 'h-4 w-4',
    '5': 'h-5 w-5',
    '6': 'h-6 w-6',
    '8': 'h-8 w-8',
};

export interface CheckBoxProps
    extends React.ComponentPropsWithoutRef<'button'> {
    checked?: boolean;
    text?: string;
    size?: keyof typeof sizes;
    textClassName?: string;
}

const Checkbox: React.FC<CheckBoxProps> = ({
    checked = false,
    size = '5',
    text,
    textClassName,
    ...props
}) => {
    const cn = `flex rounded-sm items-center justify-center ${sizes[size]} ${
        checked ? 'bg-accent' : 'border-accent border-3'
    } ${props.className}`;

    if (!text) {
        return (
            <button className={cn} {...props}>
                {checked && <CheckIcon className="text-white h-5" />}
            </button>
        );
    }

    return (
        <button className="flex items-center justify-start" {...props}>
            <div className={cn}>
                {checked && <CheckIcon className="text-white h-5" />}
            </div>

            <span className={`text-white text-sm no_select ml-1.5 ${textClassName}`}>
                {text}
            </span>
        </button>
    );
};

export default Checkbox;
