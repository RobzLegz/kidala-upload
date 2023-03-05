import { FileInterface } from '../interfaces/file';
import { shuffle } from './shuffleArray';

export const sortFiles = (files: FileInterface[]) => {
    const ads = files.filter((f) => f.is_ad === true);
    const non_ads = files.filter((f) => !f.is_ad);
    const shuffled_ads: FileInterface[] = shuffle(ads);

    const algo_files: FileInterface[] = [...shuffled_ads, ...non_ads.reverse()];

    return algo_files;
};
