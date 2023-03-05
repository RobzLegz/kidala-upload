export const isImage = (filename: string) => {
    const re = /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif|JPG|JPEG)$/;

    return re.test(filename);
};
