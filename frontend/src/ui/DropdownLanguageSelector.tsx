import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React from 'react';
import { supportedLanguages } from '../languages/text';

const DropdownLanguageSelector = () => {
    return (
        <div className="flex items-center justify-center absolute top-0 -right-[100px] lg:-right-[198px] w-[100px] lg:w-[198px]">
            <div className="w-1 bg-transparent" />

            <div className="flex flex-col items-center justify-start w-24 lg:w-48 bg-primary-800 border border-primary-700 rounded-lg">
                <div className="h-10 w-full hidden lg:flex items-center justify-between border-b border-primary-700">
                    <ChevronLeftIcon className="text-primary-200 w-6" />

                    <strong className="text-primary-200 hidden lg:block">
                        Language
                    </strong>

                    <div className="w-6 hidden lg:block" />
                </div>

                <div className="w-full px-0 py-0.5 md:p-1 lg:p-2 max-h-[180px] overflow-y-scroll tag_wrapper">
                    {supportedLanguages.map((language, i) => (
                        <button
                            className="flex w-full items-center justify-start px-1 py-1  md:px-2 md:py-1 lg:px-4 lg:py-2 hover:bg-primary-700 rounded-lg cursor-pointer"
                            key={i}
                        >
                            <Image
                                src={language.flag}
                                width={20}
                                height={15}
                                objectFit="cover"
                                alt="Kidala"
                            />

                            <p className="ml-2 text-primary-200 hidden lg:block">
                                {language.language}
                            </p>

                            <small className="ml-2 text-primary-200 block lg:hidden text-left truncate">
                                {language.short}
                            </small>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownLanguageSelector;
