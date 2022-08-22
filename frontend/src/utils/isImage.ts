export const isImage = (filename: string) => {
    const re = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

    return re.test(filename);
};
