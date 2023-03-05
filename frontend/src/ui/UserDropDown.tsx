import {
    BugAntIcon,
    BookmarkIcon,
    CogIcon,
    DocumentIcon,
    LanguageIcon,
    UserIcon,
} from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, UserInfo } from '../redux/slices/userSlice';
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
        icon: <UserIcon className="text-primary-200 h-5" />,
        text: 'Profile',
        isLanguage: false,
        url: '/profile',
    },
    {
        icon: <LanguageIcon className="text-primary-200 h-5" />,
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
        icon: <BugAntIcon className="text-primary-200 h-5" />,
        text: 'Report a bug',
        isLanguage: false,
        url: 'https://github.com/RobzLegz/kidala-upload/issues/',
    },
];

const UserDropDown: React.FC<UserDropDownProps> = ({
    className,
    avatar,
    icon,
    controllerClassName,
}) => {
    const userInfo: UserInfo = useSelector(selectUser);

    const [expanded, setExpanded] = useState(false);

    const handleDropdown = () => {
        setExpanded(!expanded);
    };

    return (
        <div
            className={`flex flex-col items-end justify-start w-8 h-8 overflow-visible ${
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
