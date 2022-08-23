export interface Translation {
    home: {
        selectFile: string;
        upload: string;
        maxSize: string;
    };
    navigation: {
        gallery: string;
        myFiles: string;
        home: string;
    };
    gallery: {
        contact: string;
        download: string;
        copyLink: string;
        showNonImageFiles: string;
        seen: string;
    };
}

export interface SupportedLang {
    lang: 'EN' | 'LV';
    language: string;
    short: string;
    flag: string;
}

export const translatedText: Record<'LV' | 'EN', Translation> = {
    LV: {
        home: {
            selectFile: 'izvēlieties failu',
            upload: 'augšupielādēt',
            maxSize: '(max faila izmērs 1mb)',
        },
        navigation: {
            gallery: 'Galerija',
            myFiles: 'Mani faili',
            home: 'Sākums',
        },
        gallery: {
            contact: 'Kontaktē reklāmdevēju:',
            download: 'Lejuplādēt',
            copyLink: 'Kopēt saiti',
            showNonImageFiles: 'Rādīt failus kas nav bildes',
            seen: 'Redzēts:',
        },
    },
    EN: {
        home: {
            selectFile: 'select file',
            upload: 'upload',
            maxSize: '(max file size 1mb)',
        },
        navigation: {
            gallery: 'Galley',
            myFiles: 'My files',
            home: 'Home',
        },
        gallery: {
            contact: 'Contact advertiser:',
            download: 'Download',
            copyLink: 'Copy url',
            showNonImageFiles: 'Show non image files',
            seen: 'Seen:',
        },
    },
};

export const supportedLanguages: SupportedLang[] = [
    {
        language: 'Latvian',
        short: 'LV',
        flag: 'https://www.worldometers.info/img/flags/small/tn_lg-flag.gif',
        lang: 'LV',
    },
    {
        language: 'English (UK)',
        short: 'EN (UK)',
        flag: 'https://www.worldometers.info/img/flags/small/tn_uk-flag.gif',
        lang: 'EN',
    },
    {
        language: 'English (USA)',
        short: 'EN (USA)',
        flag: 'https://www.worldometers.info/img/flags/small/tn_us-flag.gif',
        lang: 'EN',
    },
];
