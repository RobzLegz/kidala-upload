import { FileInterface } from '../interfaces/file';

export const getFileLikes = (file?: FileInterface) => {
    if (!file) {
        return 0;
    }

    let totalLikes = 0;

    file.likes.forEach((like) => {
        totalLikes += like.count;
        console.log(like);
    });

    return totalLikes;
};

export const getFileUserLikes = (file?: FileInterface, user_id?: string) => {
    if (!file || !user_id) {
        return 0;
    }

    const userLike = file.likes.find((l) => l.user_id === user_id);

    if (userLike) {
        return userLike.count;
    }

    return 0;
};
