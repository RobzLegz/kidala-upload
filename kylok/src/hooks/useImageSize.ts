export function useImageSize(url: string) {
    let width = 0;
    let height = 0;

    const img = new Image();
    img.src = url;
    img.onload = () => {
        width = img.width;
        height = img.height;
    };

    return {
        width,
        height,
    };
}
