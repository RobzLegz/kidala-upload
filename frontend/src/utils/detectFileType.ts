export type FileType =
    | 'image'
    | 'audio'
    | 'video'
    | 'html'
    | 'css'
    | 'scss'
    | 'js'
    | null;

export const detectFileType: (name: string | undefined) => FileType = (
    name: string | undefined
) => {
    if (!name) {
        return null;
    }

    if (
        name.includes('.png') ||
        name.includes('.jpg') ||
        name.includes('.gif') ||
        name.includes('.jpeg') ||
        name.includes('.svg') ||
        name.includes('.jfif') ||
        name.includes('.webp')
    ) {
        return 'image';
    } else if (name.includes('.mp3') || name.includes('.wav')) {
        return 'audio';
    } else if (name.includes('.mp4') || name.includes('.mov')) {
        return 'video';
    } else if (name.includes('.html')) {
        return 'html';
    } else if (name.includes('.css')) {
        return 'css';
    } else if (name.includes('.scss')) {
        return 'scss';
    } else if (name.includes('.js')) {
        return 'js';
    }

    return null;
};
