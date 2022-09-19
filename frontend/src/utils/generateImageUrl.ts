import { BASE_URL } from '../requests/routes';

export const generateImageUrl = (hash: string, name: string) =>
    `${BASE_URL}/files/${hash}/${name}`;
