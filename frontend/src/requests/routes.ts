export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : '';
export const API_BASE = `${BASE_URL}/api/v1`;

export const ADMIN_BASE = `${API_BASE}/admin`;
export const FILE_BASE = `${API_BASE}/files`;
export const TAG_BASE = `${API_BASE}/tags`;
export const USERS_BASE = `${API_BASE}/users`;

export const ADMIN_DELETE_ROUTE = `${ADMIN_BASE}/delete`;

export const LOGIN_ROUTE = `${USERS_BASE}/login`;
export const REGISTER_ROUTE = `${USERS_BASE}/register`;

export const UPLOAD_ROUTE = `${FILE_BASE}/upload`;
export const LIST_FILES_ROUTE = `${FILE_BASE}/allfiles`;
export const SINGLE_FILE_ROUTE = `${FILE_BASE}/file`;
export const LIKE_FILE_ROUTE = `${FILE_BASE}/like`;
export const FAVOURITE_FILE_ROUTE = `${FILE_BASE}/favourtie`;

export const GET_USER_INFO_ROUTE = `${USERS_BASE}/me`;
export const GET_USER_ITEMS_ROUTE = `${GET_USER_INFO_ROUTE}/items`;
export const GET_USER_FAVOURITED_FILES = `${GET_USER_INFO_ROUTE}/favourites`;
export const GET_USER_LIKED_FILES = `${GET_USER_INFO_ROUTE}/likes`;
