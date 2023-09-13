import { instance } from '@/shared/api/axios';
import { setCookie } from '@/shared/api/setCookie';

export const postLogin = async (userData: {
    email: string;
    password: string;
    role: number;
    firstName: string;
    secondName: string;
    thirdName: string;
}) => {
    try {
        const loginUser = await instance.post('/auth/token/login/', userData);
        setCookie('accessToken', loginUser.data.auth_token, { expires: 30, path: '/' });
    } catch (e) {
        return e;
    }
};
