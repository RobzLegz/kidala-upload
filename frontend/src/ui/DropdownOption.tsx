import { ChevronRightIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { windowSizes } from '../constants/windowSizes';
import useWindowSize from '../hooks/useWindowSize';
import DropdownLanguageSelector from './DropdownLanguageSelector';

export interface DropdownOptionProps {
    icon: React.ReactNode;
    text: string;
    isLanguage: boolean;
    url: string;
}

const DropdownOption: React.FC<DropdownOptionProps> = ({
    icon,
    text,
    isLanguage,
    url,
}) => {
    const router = useRouter();
    const windowSize = useWindowSize();

    const [showLanguages, setShowLanguages] = useState(false);

    const pushTo = () => {
        if (text === 'Report a bug') {
            window.open(url);
        } else {
            router.push(url);
        }
    };

    if (!isLanguage) {
        return (
            <button
                className="flex h-10 sm:h-9 items-center justify-start px-4 w-full"
                onClick={pushTo}
            >
                {icon}

                <p className="text-primary-200 ml-1">{text}</p>
            </button>
        );
    }

    if (windowSize.width && windowSize.width < windowSizes.sm) {
        return (
            <button
                className="flex h-10 items-center justify-between px-4 w-full relative cursor-pointer"
                onClick={() => router.push('/languages')}
            >
                <div className="flex items-center justify-start">
                    {icon}

                    <p className="text-primary-200 ml-1">{text}</p>
                </div>
            </button>
        );
    }

    return (
        <div
            className="flex h-9 items-center justify-between px-4 w-full relative cursor-pointer"
            onMouseOver={() => setShowLanguages(true)}
            onMouseLeave={() => setShowLanguages(false)}
        >
            <div className="flex items-center justify-start">
                {icon}

                <p className="text-primary-200 ml-1">{text}</p>
            </div>

            <ChevronRightIcon className="text-primary-200 h-4" />

            {showLanguages && <DropdownLanguageSelector />}
        </div>
    );
};

export default DropdownOption;
