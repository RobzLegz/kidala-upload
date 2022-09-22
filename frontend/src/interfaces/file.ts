export interface FileInterface {
    _id: string;
    name: string;
    hash: string;
    size?: number;
    author?: string;
    email?: string;
    phoneNumber?: string;
    private?: boolean;
    is_ad?: boolean;
    tag?: string;
    description?: string;
}
