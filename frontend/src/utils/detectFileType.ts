export const detectFileType: (name: string) => 'image' | 'audio' | null = (
    name: string
) => {
    if (
        name.includes('.png') ||
        name.includes('.jpg') ||
        name.includes('.gif') ||
        name.includes('.jpeg') ||
        name.includes('.svg') ||
        name.includes('.jfif') ||
        name.includes('.webp')
    ) {
        return 'image';
    } else if (name.includes('.mp3') || name.includes('.wav')) {
        return 'audio';
    }

    return null;
};
