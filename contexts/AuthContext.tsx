'use client';

import { IUser, ResponseData } from '@/libs/definations';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Utils from '@/libs/utils';
import { LOGIN, REGISTER_USER } from '@/libs/graphql/queries/user';
import { print } from 'graphql';
import { UserService } from '@/services/userService';

interface AuthContextProps {
    user: IUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (user: IUser) => Promise<ResponseData>;
    changePassword: ({
        userId,
        currentPassword,
        newPassword
    }: {
        userId: string;
        currentPassword: string;
        newPassword: string;
    }) => Promise<ResponseData>;
    setUser: (user: IUser | null) => void;
    error: string | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: () => {},
    register: async (user: IUser) =>{
        return {} as ResponseData; // default dummy return
    },
    changePassword: async ({
        userId,
        currentPassword,
        newPassword
    }: {
        userId: string;
        currentPassword: string;
        newPassword: string;
    }) => {
        return {} as ResponseData; // default dummy return
    },
    setUser: (user: IUser | null) => {},
    error: null,
    loading: false
});

export const useAuth = (): AuthContextProps => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
	
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await UserService.login(email, password);
            if (response.success) {
                const foundUser = response.data;
                if (foundUser != null) {
                    setUser(foundUser);
                } else {
                    setError('Username/password is wrong.');
                }
            } else {
                setError(response.message!);
            }
        } catch (err) {
            setError(Utils.getErrMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const register = async (user: IUser): Promise<ResponseData> => {
        setLoading(true);
        setError(null);

        try {
            const response = await UserService.registerUser(
                user.email,
                user.password
            );
            if (response.success) {
                const newUser = response.data;
                setUser(newUser);
            } else {
                setError(response.message!);
            }

			return response;
        } catch (err) {
			return handleError(err);
        } finally {
            setLoading(false);
        }
    };
	
    const changePassword = async ({
        userId,
        currentPassword,
        newPassword
    }: {
        userId: string;
        currentPassword: string;
        newPassword: string;
    }): Promise<ResponseData> => {
        setLoading(true);
        setError(null);

        try {
            const response = await UserService.changePassword(
                userId,
                currentPassword,
                newPassword
            );
            if (response.success) {
                const newUser = response.data;
                setUser(newUser);
            } else {
                setError(response.message!);
            }
			
			return response;
        } catch (err) {
			return handleError(err);
        } finally {
            setLoading(false);
        }
    };

	const handleError = (err: unknown): ResponseData => {
		const msg = Utils.getErrMessage(err);
		setError(msg);
		return { success: false, message: msg };
	}
	
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                error: error,
                login,
                logout,
                register,
				changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
