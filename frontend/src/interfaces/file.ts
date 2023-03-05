import { Tag } from './tag';
import { Like } from './like';

export interface FileInterface {
    _id: string;
    name: string;
    hash: string;
    size: number;
    author: string;
    private: boolean;
    description: string | null;
    tag: Tag[];
    likes: Like[];
}
