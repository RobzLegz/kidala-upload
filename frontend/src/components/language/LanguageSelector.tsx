import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SupportedLang, supportedLanguages } from '../../languages/text';
import {
    changeLanguage,
    LanguageInfo,
    selectLanguage,
} from '../../redux/slices/languageSlice';

function LanguageSelector() {
    const dispatch = useDispatch();

    const languageInfo: LanguageInfo = useSelector(selectLanguage);

    const [activeLang, setActiveLang] =
        useState<SupportedLang | undefined>(undefined);
    const [langsOpen, setLangsOpen] = useState<boolean>(false);

    useEffect(() => {
        let query: string = languageInfo.activeLang;

        const selected_lang = localStorage.getItem('selected_lang');
        if (selected_lang) {
            query = selected_lang;

            dispatch(changeLanguage(selected_lang));
        }

        const activeLanguage = supportedLanguages.find(
            (lang) => lang.lang === query
        );
        if (activeLanguage) {
            setActiveLang(activeLanguage);
        }
    }, []);

    const handleChange = (lang: SupportedLang['lang']) => {
        localStorage.setItem('selected_lang', lang);
        dispatch(changeLanguage(lang));

        const activeLanguage = supportedLanguages.find(
            (la) => la.lang === lang
        );
        if (activeLanguage) {
            setActiveLang(activeLanguage);
        }
        setLangsOpen(false);
    };

    if (!activeLang) {
        return null;
    }

    return (
        <div className="absolute top-4 right-4 flex flex-col items-start justify-start z-40">
            <button
                className="w-20 h-8 flex items-center justify-center border-2 border-white rounded-md bg-transparent_dark"
                onClick={() => setLangsOpen(!langsOpen)}
            >
                <div className="flex h-full items-center justify-center">
                    <Image src={activeLang.flag} width={20} height={18} />

                    <strong className="text-white ml-1">
                        {activeLang.lang}
                    </strong>
                </div>

                <ChevronDownIcon
                    className={`text-white w-4 duration-300 ${
                        langsOpen ? 'rotate-180' : '-rotate-0'
                    }`}
                />
            </button>

            <div
                className={`w-full flex-col bg-transparent_dark ${
                    langsOpen ? 'flex' : 'hidden'
                }`}
            >
                {supportedLanguages.map((lang, i) => {
                    if (lang.short === activeLang.short) {
                        return null;
                    }

                    return (
                        <button
                            className="flex w-full items-center justify-center py-1"
                            onClick={() => handleChange(lang.lang)}
                            key={i}
                        >
                            <Image src={lang.flag} width={20} height={18} />

                            <strong className="text-white ml-1">
                                {lang.lang}
                            </strong>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default LanguageSelector;
