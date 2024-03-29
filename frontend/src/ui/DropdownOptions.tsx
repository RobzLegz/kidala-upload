import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import React from 'react';
import DropdownOption, { DropdownOptionProps } from './DropdownOption';

export interface DropdownOptionsProps {
    expanded: boolean;
    items: DropdownOptionProps[];
    handleDropdown: () => void;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({
    items,
    expanded,
    handleDropdown,
}) => {
    return (
        <div
            className={`z-20 sm:z-10 min-h-[300px] sm:min-h-[200px] flex flex-col border border-primary-700 rounded-none sm:rounded-lg items-center justify-start w-full sm:w-48 bottom-0 left-0 sm:bottom-auto sm:left-auto sm:mt-2 fixed sm:relative transition-all duration-500 bg-primary-800 sm:p-1.5 ${
                expanded
                    ? '-translate-y-0 sm:flex sm:translate-y-0'
                    : 'translate-y-full sm:hidden sm:translate-y-0'
            }`}
        >
            <div
                className={`flex sm:hidden items-center justify-between w-full bg-primary-800 border-b border-primary-700 h-10`}
            >
                <button
                    className="w-8 h-8 flex items-center justify-center z-10"
                    onClick={handleDropdown}
                >
                    <ChevronLeftIcon className="text-primary-200 w-6" />
                </button>

                <strong className="text-primary-200 text-center">
                    Options
                </strong>

                <div className="w-8 h-8" />
            </div>

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
