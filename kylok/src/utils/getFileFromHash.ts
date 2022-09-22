import { FileInterface } from '../interfaces/file';

export const getFileFromHash = (
    hash: string | string[] | undefined,
    files: FileInterface[] | null
) => {
    if (typeof hash !== 'string' || !files) {
        return undefined;
    }

    return files.find((f) => f.hash === hash);
};
