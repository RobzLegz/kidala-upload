export interface SupportedLang {
    lang: 'EN' | 'LV' | 'RU'| 'DE';
    language: string;
    short: string;
    flag: string;
}

export const translatedText: Record<SupportedLang["lang"], Translation> = {
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
        DE: {
        home: {
            selectFile: 'translation',
            changeFile: 'translation',
            ready: 'translation',
            upload: 'translation',
            maxSize: '(translation)',
            copied: 'translation',
        },
        navigation: {
            gallery: 'translation',
            myFiles: 'translation',
            home: 'translation',
        },
        gallery: {
            contact: 'translation:',
            download: 'downloaden',
            copyLink: 'link kopieren',
            showNonImageFiles: 'translation',
            seen: 'gesehen:',
        },
        global: {
            open: 'translation',
            close: 'translation',
        },
    },
    RU: {
        home: {
            selectFile: 'Выберите файл',
            changeFile: 'Изменить файл',
            ready: 'Готов к загрузке',
            upload: 'Загрузить',
            maxSize: '(макс. размер файла 1мб)',
            copied: 'Скопировано',
        },
        navigation: {
            gallery: 'Галерея',
            myFiles: 'Мои файлы',
            home: 'Домой',
        },
        gallery: {
            contact: 'Связаться с рекламодателем:',
            download: 'Загрузить',
            copyLink: 'Копировать ссылку',
            showNonImageFiles: 'Показывать также файлы',
            seen: 'Просмотрено:',
        },
        global: {
            open: 'Открыть',
            close: 'Закрыть',
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
    {
        language: 'Russian (RU)',
        short: 'RU',
        flag: 'https://www.worldometers.info/img/flags/rs-flag.gif',
        lang: 'RU',
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
} // :)
