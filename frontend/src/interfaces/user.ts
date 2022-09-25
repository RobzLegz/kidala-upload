export interface User {
    _id: string;
    ip: string | null;
    email: string | null;
    role: "admin" | null;
    username: string | null;
    password: string | null;
    favourites: string[];
    verified: boolean;
    followers: string[];
    following: string[];
    files: string[];
}
