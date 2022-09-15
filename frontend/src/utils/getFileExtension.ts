export const getFileExtension = (fileName: string) => {
    const splitName = fileName.split('.');
    const extension = splitName[splitName.length - 1];

    return extension;
};
