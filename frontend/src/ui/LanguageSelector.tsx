import { GlobeAltIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useState } from 'react';
import { supportedLanguages } from '../languages/text';

export interface LanguageSelectorProps {
    testOpen?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    testOpen = false,
}) => {
    const [open, setOpen] = useState(testOpen);

    return (
        <div
            className="hidden sm:flex relative w-8 h-8 items-center justify-center z-20"
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <div className="flex items-center justify-center relative">
                <GlobeAltIcon className="text-primary-100 h-6" />
            </div>

            {open && (
                <div className="flex flex-col items-center justify-start absolute top-7 right-0 w-48">
                    <div className="h-2 bg-transparent"></div>

                    <div className="flex flex-col items-center justify-start w-full bg-primary-800 border border-primary-700 rounded-lg">
                        <div className="w-full px-0 py-0.5 md:p-1 lg:p-2 max-h-[180px] overflow-y-scroll tag_wrapper">
                            {supportedLanguages.map((language, i) => (
                                <button
                                    className="flex w-full items-center justify-start px-2 py-1  hover:bg-primary-700 rounded-lg cursor-pointer"
                                    key={i}
                                >
                                    <Image
                                        src={language.flag}
                                        width={20}
                                        height={15}
                                        objectFit="cover"
                                    />

                                    <p className="ml-2 text-primary-200 ">
                                        {language.language}
                                    </p>

                                    {/* <small className="ml-2 text-primary-200 block lg:hidden text-left truncate">
                                        {language.short}
                                    </small> */}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
