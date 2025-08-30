import { ResponseData } from '@/libs/definations';
import { sendGraphQLRequest } from './requestService';
import {
    CHANGE_PASSWORD,
    DELETE_USER,
    LOGIN,
    REGISTER_USER,
    REQUEST_TO_RESET_PASSWORD
} from '@/libs/graphql/queries/user';

export const UserService = {
    login: async (email: string, password: string): Promise<ResponseData> => {
        return sendGraphQLRequest(LOGIN, { email, password }, 'login');
    },
    changePassword: async (
        id: string,
        oldPassword: string,
        newPassword: string
    ): Promise<ResponseData> => {
        return sendGraphQLRequest(
            CHANGE_PASSWORD,
            { id, oldPassword, newPassword },
            'changePassword'
        );
    },
    registerUser: async (
        email: string,
        password: string
    ): Promise<ResponseData> => {
        return sendGraphQLRequest(REGISTER_USER, { email, password }, 'createUser');
    },
    requestToResetPassword: async (
        email: string
    ): Promise<ResponseData> => {
        return sendGraphQLRequest(REQUEST_TO_RESET_PASSWORD, { email }, 'requestToResetPassword');
    },
    deleteUser: async (id: string) => {
        return sendGraphQLRequest(DELETE_USER, { id }, 'deleteUser');
    }
};
