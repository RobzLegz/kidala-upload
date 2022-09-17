import {
    BanIcon,
    ChevronRightIcon,
    CogIcon,
    GlobeAltIcon,
    GlobeIcon,
    UserIcon,
} from '@heroicons/react/solid';
import React, { useState } from 'react';
import DropDownController from './DropDownController';
import { DropdownOptionProps } from './DropdownOption';
import DropdownOptions from './DropdownOptions';

export interface UserDropDownProps {
    avatar?: string;
    icon?: React.ReactNode;
    className?: string;
    controllerClassName?: string;
}

const dropdownOptions: DropdownOptionProps[] = [
    {
        icon: <GlobeAltIcon className="text-primary-200 h-5" />,
        text: 'Language',
        isLanguage: true,
        url: '',
    },
    {
        icon: <CogIcon className="text-primary-200 h-5" />,
        text: 'Settings',
        isLanguage: false,
        url: '/settings',
    },
    {
        icon: <BanIcon className="text-primary-200 h-5" />,
        text: 'Report a bug',
        isLanguage: false,
        url: 'https://github.com/RobzLegz/kidala-upload/issues/new',
    },
];

const UserDropDown: React.FC<UserDropDownProps> = ({
    className,
    avatar,
    icon,
    controllerClassName,
}) => {
    const [expanded, setExpanded] = useState(false);

    const handleDropdown = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className={`flex flex-col items-end justify-start sm:w-48 lg:w-52 h-10 overflow-visible absolute sm:right-28 lg:right-[200px] ${
                className && className
            }`}
        >
            <DropDownController
                avatar={avatar}
                icon={icon}
                className={controllerClassName}
                expanded={expanded}
                handleDropdown={handleDropdown}
            />

            <DropdownOptions
                items={dropdownOptions}
                expanded={expanded}
                handleDropdown={handleDropdown}
            />
        </div>
    );
};

export default UserDropDown;
