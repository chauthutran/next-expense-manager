import { ResponseData } from '@/libs/definations';
import { sendRequest } from './requestService';
import {
    CHANGE_PASSWORD,
    DELETE_USER,
    LOGIN,
    REGISTER_USER
} from '@/libs/graphql/queries/user';

export const UserService = {
    login: async (email: string, password: string): Promise<ResponseData> => {
        return sendRequest(LOGIN, { email, password }, 'login');
    },
    changePassword: async (
        id: string,
        oldPassword: string,
        newPassword: string
    ): Promise<ResponseData> => {
        return sendRequest(
            CHANGE_PASSWORD,
            { id, oldPassword, newPassword },
            'changePassword'
        );
    },
    registerUser: async (
        email: string,
        password: string
    ): Promise<ResponseData> => {
        return sendRequest(REGISTER_USER, { email, password }, 'createUser');
    },
    deleteUser: async (id: string) => {
        return sendRequest(DELETE_USER, { id }, 'deleteUser');
    }
};
