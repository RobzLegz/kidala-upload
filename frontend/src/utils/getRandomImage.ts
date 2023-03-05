import { FileInterface } from '../interfaces/file';
import { detectFileType } from './detectFileType';
import { generateRandomBetween } from './generateRandomIntBetween';
import { generateFileUrl } from './generateFileUrl';

export const getRandImage = (files: FileInterface[] | null) => {
    if (!files) {
        return '';
    }

    const imageFiles = files.filter(
        (file) => detectFileType(file.name) === 'image'
    );

    const imgIndex = generateRandomBetween(0, imageFiles.length - 1);

    const imgFile = imageFiles[imgIndex];

    return generateFileUrl(imgFile.hash, imgFile.name);
};
