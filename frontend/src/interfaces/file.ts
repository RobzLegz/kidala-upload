interface FileId {
    _id:
        | {
              $oid: string;
          }
        | string;
}

export interface FileInterface {
    _id: FileId['_id'];
    name: string;
    hash: string;
    size?: number;
    author?: string;
}
