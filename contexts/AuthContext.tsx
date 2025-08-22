"use client";

import { IUser } from '@/libs/definations';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Utils from "@/utils";
import { LOGIN, REGISTER_USER } from '@/libs/graphql/queries/user';
import { print } from 'graphql';
import { UserService } from '@/services/userService';


interface AuthContextProps {
	user: IUser | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (user: IUser) => Promise<void>;
	setUser: (user: IUser | null) => void,
	error: string | null;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
	user: null,
	login: async () => { },
	logout: () => { },
	register: async(user: IUser) => {},
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
                if (foundUser != null ) {
                    setUser(foundUser);
                }
                else {
                    setError("Username/password is wrong.");
                }
            }
            else {
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
	}

	const register = async(user: IUser) => {
		setLoading(true);
		setError(null);

		try {
			const response = await UserService.registerUser(user.email, user.password);
			if (response.success) {
               	const newUser = response.data;
				setUser(newUser);
            }
            else {
                setError(response.message!);
            }
		}
		catch (err) {
			setError(Utils.getErrMessage(err));
		} finally {
			setLoading(false);
		}
	}

	return (
		<AuthContext.Provider value={{ user, setUser, loading, error: error, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};
