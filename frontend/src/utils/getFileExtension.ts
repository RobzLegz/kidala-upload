export const getFileExtension = (fileName: string | undefined) => {
    if (!fileName) {
        return '';
    }

    const splitName = fileName.split('.');
    const extension = splitName[splitName.length - 1];

    return extension;
};
