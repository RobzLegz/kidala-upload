export const formatFileSize = (size: number) => {
    const formated = Math.floor(size / 100000) / 10;

    return formated;
};
