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
        url: '',
    },
];

const UserDropDown: React.FC<UserDropDownProps> = ({
    className,
    avatar,
    icon,
    controllerClassName,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className={`flex flex-col items-end justify-start w-48 relative h-10 overflow-visible ${
                className && className
            }`}
        >
            <DropDownController
                avatar={avatar}
                icon={icon}
                className={controllerClassName}
                setExpanded={setExpanded}
                expanded={expanded}
            />

            {expanded && <DropdownOptions items={dropdownOptions} />}
        </div>
    );
};

export default UserDropDown;
