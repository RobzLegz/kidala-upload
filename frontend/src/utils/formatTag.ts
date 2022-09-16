export const formatTag = (tag: string) => {
    let newTag = tag.toLowerCase();
    newTag = newTag.replace(';', '');
    newTag = newTag.replace(' ', '-');

    const splitTag = newTag.split('');

    let rtrnTag = '';

    splitTag.forEach((char) => {
        if (allowedChars.some((c) => c === char)) {
            rtrnTag = `${rtrnTag}${char}`;
        }
    });

    return rtrnTag;
};

const allowedChars = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    'o',
    'p',
    'a',
    's',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'z',
    'x',
    'c',
    'v',
    'b',
    'n',
    'm',
    '-',
];
