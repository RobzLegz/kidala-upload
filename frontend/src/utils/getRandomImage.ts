import { FileInterface } from '../interfaces/file';
import { detectFileType } from './detectFileType';
import { generateRandomBetween } from './generateRandomIntBetween';
import { generateImageUrl } from './generateImageUrl';

export const getRandImage = (files: FileInterface[]) => {
    const imageFiles = files.filter(
        (file) => detectFileType(file.name) === 'image'
    );

    const imgIndex = generateRandomBetween(0, imageFiles.length - 1);

    const imgFile = imageFiles[imgIndex];

    return generateImageUrl(imgFile.hash, imgFile.name);
};
