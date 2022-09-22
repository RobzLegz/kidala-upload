import { createSlice } from '@reduxjs/toolkit';
import {
    SupportedLang,
    translatedText,
    Translation,
} from '../../languages/text';

export interface LanguageInfo {
    text: Translation;
    activeLang: SupportedLang['lang'];
}

const initialState: LanguageInfo = {
    text: translatedText.EN,
    activeLang: 'EN',
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            const lang: SupportedLang['lang'] = action.payload;

            state = {
                ...state,
                text: translatedText[lang],
            };

            return state;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;

export const selectLanguage = (state: any) => state.language;

export default languageSlice.reducer;
