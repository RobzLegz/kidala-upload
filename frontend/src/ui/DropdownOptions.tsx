import React from 'react';
import DropdownOption, { DropdownOptionProps } from './DropdownOption';

export interface DropdownOptionsProps {
    items: DropdownOptionProps[];
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ items }) => {
    return (
        <div className="flex flex-col bg-primary-800 border border-primary-700 rounded-lg items-center justify-start w-full mt-2">
            {items.map((option, i) => (
                <DropdownOption
                    text={option.text}
                    isLanguage={option.isLanguage}
                    icon={option.icon}
                    url={option.url}
                    key={i}
                />
            ))}
        </div>
    );
};

export default DropdownOptions;
