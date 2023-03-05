export const isImage = (filename: string) => {
    const re = /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif)$/;

    return re.test(filename.toLowerCase());
};
