import { Like } from './like';

export interface User {
    _id: string;
    ip: string | null;
    email: string | null;
    role: 'admin' | null;
    username: string | null;
    password: string | null;
    bio?: string | null;
    name?: string | null;
    avatar?: string | null;
    banner?: string | null;
    favourites: string[];
    likes: Like[];
    verified: boolean;
    followers: string[];
    following: string[];
    files: string[];
}
