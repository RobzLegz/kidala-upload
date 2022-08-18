export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : '';
export const ADMIN_BASE = `${BASE_URL}/admin`;
export const UPLOAD_BASE = `${BASE_URL}/upload`;

export const ADMIN_DELETE = `${ADMIN_BASE}/delete`;
export const ADMIN_LIST_FILES = `${ADMIN_BASE}/allfiles`;

export const LOGIN_ROUTE = `${ADMIN_BASE}/login`;
export const GET_INFO_ROUTE = `${ADMIN_BASE}/getUser`;
