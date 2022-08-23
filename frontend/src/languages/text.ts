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
            changeFile: 'mainīt failu',
            ready: 'ir gatavs augšupielādei',
            upload: 'augšupielādēt',
            maxSize: '(max faila izmērs 1mb)',
            copied: 'kopēts',
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
        global: {
            open: 'Atvērt',
            close: 'Aizvērt',
        },
    },
    EN: {
        home: {
            selectFile: 'select file',
            changeFile: 'change file',
            ready: 'is ready for upload',
            upload: 'upload',
            maxSize: '(max file size 1mb)',
            copied: 'copied to clipboard',
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
        global: {
            open: 'Open',
            close: 'Close',
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

export interface Translation {
    home: {
        selectFile: string;
        changeFile: string;
        ready: string;
        upload: string;
        copied: string;
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
    global: {
        open: string;
        close: string;
    };
}
