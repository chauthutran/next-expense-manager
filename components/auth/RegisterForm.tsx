/** The login page for user authentication. Contains the LoginForm component. */

'use client';

import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from 'react-icons/io5';
import * as Constant from '@/libs/constants';
import { useMainUi } from '@/contexts/MainUiContext';
import { useAuth } from '@/contexts/AuthContext';
import Joi from 'joi';
import { IUser, JSONObject } from '@/libs/definations';

const registerSchema = Joi.object({
    email: Joi.string()
        .empty('') // treat empty string as empty value
        .required()
        .messages({
            'string.base': 'Email is invalid',
            'any.empty': 'Email is required',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .empty('') // treat empty string as empty value
        .min(4)
        .required()
        .messages({
            'string.min': 'Password must be at least 4 characters',
            'any.empty': 'Email is required',
            'any.required': 'Password is required'
        }),
    confirmPassword: Joi.any()
		.valid(Joi.ref('password'))
		.required()
    	.label('Confirm Password') // helps Joi associate the error with the correct key and display the label nicely.
		.messages({
			'any.only': 'Confirm password must match password',
    		'any.required': 'Confirm password is required'
		})
});

export default function RegisterForm() {
    const { setMainPage } = useMainUi();
    const { loading, error, user, register } = useAuth();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<JSONObject>({});

    useEffect(() => {
        if (user != null) {
            setMainPage(Constant.PAGE_EXPENSE);
        }
    }, [user]);

    const handleRegisterBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { error } = registerSchema.validate(
            { email, password, confirmPassword },
            { abortEarly: false }
        );

        if (error) {
			const newErrors = {};
			error.details.forEach((err) => {
				newErrors[err.path[0]] = err.message;
			});
			setErrors(newErrors);
		}
		else {
			register({ email, password } as IUser);
		}
    };

			console.log("----- errors", errors);
    return (
        <div className="max-w-md mx-auto p-8 h-[calc(100vh-138px)]">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <div className="mb-4">
                <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="email"
                >
                    Email
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="email"
                        type="text"
                        name="email"
                        value={email}
                        required
                        minLength={4}
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                    {errors.email && <p className="text-sm italic text-red-500">{errors.email}</p>}
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="password"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        required
                        minLength={4}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                    {errors.password && <p className="text-sm italic text-red-500">{errors.password}</p>}
                </div>
            </div>

            <div className="mb-4">
                <label
                    className="block text-xs font-medium text-gray-900"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        required
                        minLength={4}
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

                   {errors.confirmPassword && <p className="text-sm italic text-red-500">{errors.confirmPassword}</p>}
                </div>
            </div>

            <div className="mb-4">
                <button
                    className="flex w-full flex-row bg-gold px-4 py-2 rounded hover:bg-yellow-300"
                    onClick={(e) => handleRegisterBtn(e)}
                >
                    <span className="flex-1">Register</span>
                    {loading && (
                        <FaSpinner
                            className="ml-auto h-5 text-gray-50"
                            size={20}
                        />
                    )}
                </button>
            </div>

            <div className="flex h-8 items-end space-x-1">
                {error !== null && <p>{error}</p>}
            </div>
        </div>
    );
}
