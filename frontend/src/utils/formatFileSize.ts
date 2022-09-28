export const formatFileSize = (size: number) => {
    const formated = Math.floor(size / 10000) / 10;

    return formated;
};
