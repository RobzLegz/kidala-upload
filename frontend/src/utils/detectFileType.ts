import { getFileExtension } from './getFileExtension';

export type FileType = string | null;

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
        name.includes('.ico') ||
        name.includes('.webp')
    ) {
        return 'image';
    } else if (name.includes('.mp3') || name.includes('.wav')) {
        return 'audio';
    } else if (name.includes('.mp4') || name.includes('.mov')) {
        return 'video';
    } else {
        return getFileExtension(name);
    }
};
