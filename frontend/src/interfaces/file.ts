export interface FileInterface {
    _id: {
        $oid: string;
    };
    name: string;
    hash: string;
    size?: number;
    author?: string;
    email?: string;
    phoneNumber?: string;
    private?: boolean;
    is_ad?: boolean;
    description?: string;
}
