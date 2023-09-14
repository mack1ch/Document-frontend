import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@/shared/authBlocks/auth';

let Token = null;

if (typeof document !== 'undefined') {
    Token = getAccessToken();
}

const BASE_URL = 'https://docs.inverse-team.store/api';

export const instanceLogged: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { Authorization: `Token ${Token}` },
});

export const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});
