import { ChevronLeftIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';
import { supportedLanguages } from '../languages/text';

const DropdownLanguageSelector = () => {
    return (
        <div className="flex items-center justify-center absolute top-0 -right-[198px] w-[198px]">
            <div className="w-1 bg-transparent" />

            <div className="flex flex-col items-center justify-start w-48 bg-primary-800 border border-primary-700 rounded-lg">
                <div className="h-10 w-full flex items-center justify-between border-b border-primary-700">
                    <ChevronLeftIcon className="text-primary-200 w-6" />

                    <strong className="text-primary-200">Language</strong>

                    <div className="w-6" />
                </div>

                <div className="w-full p-2 max-h-[180px] overflow-y-scroll tag_wrapper">
                    {supportedLanguages.map((language, i) => (
                        <button
                            className="flex w-full items-center justify-start px-4 py-2 hover:bg-primary-700 rounded-lg cursor-pointer"
                            key={i}
                        >
                            <Image
                                src={language.flag}
                                width={20}
                                height={17}
                                objectFit="cover"
                            />

                            <p className="ml-2 text-primary-200">
                                {language.language}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownLanguageSelector;
