import { getFileExtension } from './getFileExtension';
import { isImage } from './isImage';

export type FileType = string | null;

export const detectFileType: (name: string | undefined) => FileType = (
    name: string | undefined
) => {
    if (!name) {
        return null;
    }

    if (isImage(name)) {
        return 'image';
    } else if (name.includes('.mp3') || name.includes('.wav')) {
        return 'audio';
    } else if (name.includes('.mp4') || name.includes('.mov')) {
        return 'video';
    } else {
        return getFileExtension(name);
    }
};
