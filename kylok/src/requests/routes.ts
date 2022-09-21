export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : '';
export const API_BASE = `${BASE_URL}/api`;
export const ADMIN_BASE = `${BASE_URL}/admin`;
export const UPLOAD_BASE = `${BASE_URL}/upload`;

export const ADMIN_DELETE = `${ADMIN_BASE}/delete`;
export const LIST_FILES = `${API_BASE}/files`;

export const LOGIN_ROUTE = `${ADMIN_BASE}/login`;
export const GET_INFO_ROUTE = `${ADMIN_BASE}/getUser`;
