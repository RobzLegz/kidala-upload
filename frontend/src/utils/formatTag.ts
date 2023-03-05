export const formatTag = (tag: string) => {
    let newTag = tag.toLowerCase();

    const splitTag = newTag.split('');

    let rtrnTag = '';

    splitTag.forEach((char) => {
        if (char === ' ') {
            rtrnTag = `${rtrnTag}-`;
        } else if (allowedChars.some((c) => c === char)) {
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
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];
